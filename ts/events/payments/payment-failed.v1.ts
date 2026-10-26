// Generated from schemas/events/payments/payment-failed.v1.json. Do not edit.

/**
 * Reply to payments.request-payment or payments.refund-payment: no money was taken (declined, canceled or timed out). Keyed by paymentId.
 */
export interface PaymentFailedV1 {
  /**
   * Null when no payment was ever created for the checkout.
   */
  paymentId: string | null;
  checkoutId: string;
  customerId: string;
  /**
   * Minor units (cents).
   */
  amount: number;
  /**
   * ISO 4217 code.
   */
  currency: string;
  reason:
    "card_declined" | "insufficient_funds" | "authentication_required" | "canceled" | "timeout" | "processing_error";
  /**
   * Stripe's message, safe to show the customer.
   */
  message: string | null;
  stripePaymentIntentId: string | null;
  failedAt: string;
}
