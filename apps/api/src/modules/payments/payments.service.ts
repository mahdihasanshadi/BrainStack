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

export interface CheckoutSessionResponse {
  sessionId: string;
  checkoutUrl: string;
  courseTitle: string;
  priceBdt: number;
  originalPriceBdt: number;
  discountPercent: number;
  paymentMethods: PaymentMethodInfo[];
  mode: "stripe" | "demo";
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
  completedAt: string | null;
  parentName: string | null;
  phone: string | null;
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
      completedAt: purchase.completedAt?.toISOString() ?? null,
      parentName: purchase.parentName,
      phone: purchase.phone,
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
