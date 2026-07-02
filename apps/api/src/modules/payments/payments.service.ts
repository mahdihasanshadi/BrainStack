import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import Stripe = require("stripe");
import { Repository } from "typeorm";
import type { Configuration } from "../../config/configuration";
import { Course } from "../courses/entities/course.entity";
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";
import {
  CoursePurchase,
  type PaymentProvider,
} from "./entities/course-purchase.entity";

export interface PaymentMethodInfo {
  id: string;
  label: string;
  description: string;
}

export interface ManualPaymentDetails {
  merchantNumber: string;
  merchantLabel: string;
  whatsappNumber: string;
  whatsappUrl: string;
  instructions: string[];
}

export interface CheckoutSessionResponse {
  sessionId: string;
  checkoutUrl: string;
  courseTitle: string;
  priceBdt: number;
  originalPriceBdt: number;
  discountPercent: number;
  paymentMethods: PaymentMethodInfo[];
  mode: "stripe" | "demo" | "manual";
  manualPayment?: ManualPaymentDetails;
}

export interface CheckoutSessionStatusResponse {
  sessionId: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  courseTitle: string;
  courseSlug: string;
  email: string;
  amountBdt: number;
  originalPriceBdt: number;
  provider: PaymentProvider;
  paymentMethod: string | null;
  completedAt: string | null;
  parentName: string | null;
  phone: string | null;
  manualPayment?: ManualPaymentDetails;
}

const PAYMENT_METHODS: PaymentMethodInfo[] = [
  {
    id: "card",
    label: "Visa / Mastercard",
    description: "International debit & credit cards via Stripe",
  },
  {
    id: "bkash",
    label: "bKash",
    description: "Mobile wallet — pay at checkout when available",
  },
  {
    id: "nagad",
    label: "Nagad",
    description: "Mobile financial service",
  },
];

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private stripe: Stripe | null = null;

  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(CoursePurchase)
    private readonly purchasesRepository: Repository<CoursePurchase>,
    private readonly configService: ConfigService<Configuration, true>,
  ) {
    const stripeSecretKey = this.configService.get("stripe.secretKey", {
      infer: true,
    });

    if (stripeSecretKey) {
      this.stripe = new Stripe(stripeSecretKey);
    }
  }

  getPaymentMethods(): PaymentMethodInfo[] {
    return PAYMENT_METHODS;
  }

  async createCheckoutSession(
    dto: CreateCheckoutSessionDto,
  ): Promise<CheckoutSessionResponse> {
    const course = await this.coursesRepository.findOne({
      where: { slug: dto.courseSlug.trim() },
    });

    if (!course) {
      throw new NotFoundException(`Course "${dto.courseSlug}" was not found`);
    }

    if (!course.isPurchasable || course.priceBdt <= 0) {
      throw new BadRequestException(
        "This course is not available for purchase yet.",
      );
    }

    const frontendUrl = this.configService
      .get("app.frontendUrl", { infer: true })
      .replace(/\/$/, "");
    const paymentsEnabled = this.configService.get("payments.enabled", {
      infer: true,
    });
    const originalPriceBdt =
      course.originalPriceBdt > course.priceBdt
        ? course.originalPriceBdt
        : course.priceBdt;
    const discountPercent = Math.round(
      ((originalPriceBdt - course.priceBdt) / originalPriceBdt) * 100,
    );

    const paymentMethod = dto.paymentMethod ?? "card";

    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      return this.createManualCheckoutSession({
        course,
        dto,
        frontendUrl,
        originalPriceBdt,
        discountPercent,
        paymentMethod,
      });
    }

    if (paymentsEnabled && this.stripe) {
      return this.createStripeCheckoutSession({
        course,
        dto,
        frontendUrl,
        originalPriceBdt,
        discountPercent,
      });
    }

    return this.createDemoCheckoutSession({
      course,
      dto,
      frontendUrl,
      originalPriceBdt,
      discountPercent,
    });
  }

  async getCheckoutSessionStatus(
    sessionId: string,
  ): Promise<CheckoutSessionStatusResponse> {
    const purchase = await this.purchasesRepository.findOne({
      where: { stripeSessionId: sessionId },
      relations: { course: true },
    });

    if (!purchase) {
      throw new NotFoundException("Checkout session not found.");
    }

    if (purchase.status === "pending" && this.stripe) {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        purchase.status = "completed";
        purchase.completedAt = new Date();
        await this.purchasesRepository.save(purchase);
      }
    }

    return {
      sessionId: purchase.stripeSessionId,
      status: purchase.status,
      courseTitle: purchase.course.title,
      courseSlug: purchase.course.slug,
      email: purchase.email,
      amountBdt: purchase.amountBdt,
      originalPriceBdt: purchase.originalPriceBdt,
      provider: purchase.provider,
      paymentMethod: purchase.paymentMethod,
      completedAt: purchase.completedAt?.toISOString() ?? null,
      parentName: purchase.parentName,
      phone: purchase.phone,
      manualPayment:
        purchase.provider === "manual"
          ? this.buildManualPaymentDetails({
              courseTitle: purchase.course.title,
              amountBdt: purchase.amountBdt,
              paymentMethod: purchase.paymentMethod as "bkash" | "nagad",
              parentName: purchase.parentName ?? "Parent",
              phone: purchase.phone ?? "",
              email: purchase.email,
              sessionId: purchase.stripeSessionId,
            })
          : undefined,
    };
  }

  private buildManualPaymentDetails(params: {
    courseTitle: string;
    amountBdt: number;
    paymentMethod: "bkash" | "nagad";
    parentName: string;
    phone: string;
    email: string;
    sessionId: string;
  }): ManualPaymentDetails | undefined {
    const whatsappNumber = this.configService.get("payments.whatsappNumber", {
      infer: true,
    });
    const bkashNumber = this.configService.get("payments.bkashNumber", {
      infer: true,
    });
    const nagadNumber = this.configService.get("payments.nagadNumber", {
      infer: true,
    });

    const merchantNumber =
      params.paymentMethod === "bkash" ? bkashNumber : nagadNumber;

    if (!whatsappNumber || !merchantNumber) {
      return undefined;
    }

    const merchantLabel = params.paymentMethod === "bkash" ? "bKash" : "Nagad";
    const whatsappMessage = [
      "Assalamualaikum BrainStack team! 👋",
      "",
      "Ami course payment confirm korte chai (kotha diye):",
      `Course: ${params.courseTitle}`,
      `Amount: ৳${params.amountBdt.toLocaleString("en-BD")}`,
      `Method: ${merchantLabel}`,
      `Send money to: ${merchantNumber}`,
      "",
      `Parent: ${params.parentName}`,
      `Phone: ${params.phone}`,
      `Email: ${params.email}`,
      `Reference: ${params.sessionId}`,
      "",
      "Transaction ID: [আপনার Trx ID লিখুন]",
      "(Payment screenshot attach korben)",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${this.toWhatsAppDigits(whatsappNumber)}?text=${encodeURIComponent(whatsappMessage)}`;

    return {
      merchantNumber,
      merchantLabel,
      whatsappNumber,
      whatsappUrl,
      instructions: [
        `Open ${merchantLabel} and send exactly ৳${params.amountBdt.toLocaleString("en-BD")} to ${merchantNumber}.`,
        "Copy your Transaction ID from the app.",
        "Tap WhatsApp — add your Trx ID and payment screenshot.",
        "Our team confirms on WhatsApp and activates your course.",
      ],
    };
  }

  async handleStripeWebhook(rawBody: Buffer, signature: string): Promise<void> {
    const webhookSecret = this.configService.get("stripe.webhookSecret", {
      infer: true,
    });

    if (!this.stripe || !webhookSecret) {
      throw new ServiceUnavailableException(
        "Stripe webhook is not configured.",
      );
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid webhook signature";
      throw new BadRequestException(message);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      await this.markPurchaseCompleted(session.id);
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;
      await this.markPurchaseStatus(session.id, "cancelled");
    }
  }

  private async createStripeCheckoutSession(params: {
    course: Course;
    dto: CreateCheckoutSessionDto;
    frontendUrl: string;
    originalPriceBdt: number;
    discountPercent: number;
  }): Promise<CheckoutSessionResponse> {
    const { course, dto, frontendUrl, originalPriceBdt, discountPercent } =
      params;

    if (!this.stripe) {
      throw new ServiceUnavailableException("Stripe is not configured.");
    }

    const session = await this.stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: dto.email.trim(),
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: course.priceBdt * 100,
            product_data: {
              name: course.title,
              description: `${course.shortDescription} — limited-time offer (${discountPercent}% off)`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseSlug: course.slug,
        parentName: dto.parentName?.trim() ?? "",
        phone: dto.phone?.trim() ?? "",
        paymentMethod: dto.paymentMethod ?? "card",
      },
      success_url: `${frontendUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/checkout/${course.slug}?cancelled=1`,
      payment_method_types: ["card"],
    });

    if (!session.url) {
      throw new ServiceUnavailableException(
        "Stripe did not return a checkout URL.",
      );
    }

    await this.purchasesRepository.save(
      this.purchasesRepository.create({
        courseId: course.id,
        email: dto.email.trim(),
        phone: dto.phone?.trim() ?? null,
        parentName: dto.parentName?.trim() ?? null,
        stripeSessionId: session.id,
        amountBdt: course.priceBdt,
        originalPriceBdt,
        status: "pending",
        provider: "stripe",
        paymentMethod: dto.paymentMethod ?? "card",
      }),
    );

    return {
      sessionId: session.id,
      checkoutUrl: session.url,
      courseTitle: course.title,
      priceBdt: course.priceBdt,
      originalPriceBdt,
      discountPercent,
      paymentMethods: PAYMENT_METHODS,
      mode: "stripe",
    };
  }

  private async createManualCheckoutSession(params: {
    course: Course;
    dto: CreateCheckoutSessionDto;
    frontendUrl: string;
    originalPriceBdt: number;
    discountPercent: number;
    paymentMethod: "bkash" | "nagad";
  }): Promise<CheckoutSessionResponse> {
    const { course, dto, frontendUrl, originalPriceBdt, discountPercent, paymentMethod } =
      params;

    const whatsappNumber = this.configService.get("payments.whatsappNumber", {
      infer: true,
    });
    const bkashNumber = this.configService.get("payments.bkashNumber", {
      infer: true,
    });
    const nagadNumber = this.configService.get("payments.nagadNumber", {
      infer: true,
    });

    const merchantNumber =
      paymentMethod === "bkash" ? bkashNumber : nagadNumber;

    if (!whatsappNumber || !merchantNumber) {
      throw new ServiceUnavailableException(
        paymentMethod === "bkash"
          ? "bKash + WhatsApp payment is not configured yet. Set WHATSAPP_NUMBER and BKASH_MERCHANT_NUMBER in the API .env, or pay with card."
          : "Nagad + WhatsApp payment is not configured yet. Set WHATSAPP_NUMBER and NAGAD_MERCHANT_NUMBER in the API .env, or pay with card.",
      );
    }

    const sessionId = `manual_${Date.now()}_${course.slug}`;
    const checkoutUrl = `${frontendUrl}/checkout/manual?session_id=${encodeURIComponent(sessionId)}`;
    const parentName = dto.parentName?.trim() ?? "Parent";
    const phone = dto.phone?.trim() ?? "";
    const email = dto.email.trim();

    const manualDetails = this.buildManualPaymentDetails({
      courseTitle: course.title,
      amountBdt: course.priceBdt,
      paymentMethod,
      parentName,
      phone,
      email,
      sessionId,
    });

    if (!manualDetails) {
      throw new ServiceUnavailableException(
        "Manual payment configuration is incomplete.",
      );
    }

    await this.purchasesRepository.save(
      this.purchasesRepository.create({
        courseId: course.id,
        email,
        phone: phone || null,
        parentName,
        stripeSessionId: sessionId,
        amountBdt: course.priceBdt,
        originalPriceBdt,
        status: "pending",
        provider: "manual",
        paymentMethod,
      }),
    );

    return {
      sessionId,
      checkoutUrl,
      courseTitle: course.title,
      priceBdt: course.priceBdt,
      originalPriceBdt,
      discountPercent,
      paymentMethods: PAYMENT_METHODS,
      mode: "manual",
      manualPayment: manualDetails,
    };
  }

  private toWhatsAppDigits(phone: string): string {
    const digits = phone.replace(/\D/g, "");
    if (digits.startsWith("880")) return digits;
    if (digits.startsWith("0")) return `88${digits}`;
    if (digits.startsWith("1") && digits.length === 10) return `88${digits}`;
    return digits;
  }

  private async createDemoCheckoutSession(params: {
    course: Course;
    dto: CreateCheckoutSessionDto;
    frontendUrl: string;
    originalPriceBdt: number;
    discountPercent: number;
  }): Promise<CheckoutSessionResponse> {
    const { course, dto, frontendUrl, originalPriceBdt, discountPercent } =
      params;

    const sessionId = `demo_${Date.now()}_${course.slug}`;
    const checkoutUrl = `${frontendUrl}/checkout/success?session_id=${sessionId}&course=${course.slug}`;

    await this.purchasesRepository.save(
      this.purchasesRepository.create({
        courseId: course.id,
        email: dto.email.trim(),
        phone: dto.phone?.trim() ?? null,
        parentName: dto.parentName?.trim() ?? null,
        stripeSessionId: sessionId,
        amountBdt: course.priceBdt,
        originalPriceBdt,
        status: "completed",
        provider: "demo",
        paymentMethod: dto.paymentMethod ?? "demo",
        completedAt: new Date(),
      }),
    );

    this.logger.warn(
      `Demo checkout created for ${course.slug}. Set PAYMENTS_ENABLED=true and STRIPE_SECRET_KEY for live payments.`,
    );

    return {
      sessionId,
      checkoutUrl,
      courseTitle: course.title,
      priceBdt: course.priceBdt,
      originalPriceBdt,
      discountPercent,
      paymentMethods: PAYMENT_METHODS,
      mode: "demo",
    };
  }

  private async markPurchaseCompleted(sessionId: string): Promise<void> {
    await this.markPurchaseStatus(sessionId, "completed", new Date());
  }

  private async markPurchaseStatus(
    sessionId: string,
    status: CoursePurchase["status"],
    completedAt?: Date,
  ): Promise<void> {
    const purchase = await this.purchasesRepository.findOne({
      where: { stripeSessionId: sessionId },
    });

    if (!purchase) {
      this.logger.warn(`Purchase record not found for session ${sessionId}`);
      return;
    }

    purchase.status = status;
    purchase.completedAt =
      status === "completed" ? (completedAt ?? new Date()) : null;
    await this.purchasesRepository.save(purchase);
  }
}
