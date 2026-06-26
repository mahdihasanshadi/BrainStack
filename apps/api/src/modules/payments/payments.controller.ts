import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import type { RawBodyRequest } from "@nestjs/common";
import type { Request } from "express";
import { RateLimitRegistrationLeads } from "../../common/decorators/rate-limit.decorator";
import { CreateCheckoutSessionDto } from "./dto/create-checkout-session.dto";
import {
  CheckoutSessionResponse,
  CheckoutSessionStatusResponse,
  PaymentMethodInfo,
  PaymentsService,
} from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get("methods")
  getMethods(): PaymentMethodInfo[] {
    return this.paymentsService.getPaymentMethods();
  }

  @Get("session/:sessionId")
  getSessionStatus(
    @Param("sessionId") sessionId: string,
  ): Promise<CheckoutSessionStatusResponse> {
    return this.paymentsService.getCheckoutSessionStatus(sessionId);
  }

  @Post("checkout-session")
  @HttpCode(HttpStatus.CREATED)
  @RateLimitRegistrationLeads()
  createCheckoutSession(
    @Body() dto: CreateCheckoutSessionDto,
  ): Promise<CheckoutSessionResponse> {
    return this.paymentsService.createCheckoutSession(dto);
  }

  @Post("webhook")
  @HttpCode(HttpStatus.OK)
  handleWebhook(
    @Req() request: RawBodyRequest<Request>,
    @Headers("stripe-signature") signature: string,
  ): Promise<{ received: true }> {
    const rawBody = request.rawBody;

    if (!rawBody) {
      throw new BadRequestException(
        "Raw body is required for Stripe webhook verification.",
      );
    }

    return this.paymentsService
      .handleStripeWebhook(rawBody, signature)
      .then(() => ({ received: true }));
  }
}
