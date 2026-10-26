// Generated from schemas/commands/payments/request-payment.v1.json. Do not edit.

/**
 * Command from checkout: create and confirm a Stripe PaymentIntent for the checkout (idempotency key checkout-{checkoutId}-pay). One payment per checkoutId. Replies: payments.payment-succeeded or payments.payment-failed, always within 5 minutes. Keyed by checkoutId.
 */
export interface RequestPaymentV1 {
  checkoutId: string;
  customerId: string;
  /**
   * Minor units (cents) to charge.
   */
  amount: number;
  /**
   * ISO 4217 code.
   */
  currency: string;
  /**
   * Stripe payment method from the storefront, e.g. pm_card_visa in test mode.
   */
  paymentMethodId: string;
  requestedAt: string;
}
