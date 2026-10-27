// Generated from schemas/events/payments/payment-requires-action.v1.json. Do not edit.

/**
 * Interim reply to payments.request-payment: the PaymentIntent is in requires_action (3-D Secure). The customer must complete it in the storefront with stripe.handleNextAction(clientSecret). No money is taken yet; payments later publishes payments.payment-succeeded or payments.payment-failed (from the Stripe webhook, or failed with reason timeout at expiresAt). A re-sent request-payment re-publishes this event while the action is pending. Keyed by paymentId.
 */
export interface PaymentRequiresActionV1 {
  paymentId: string;
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
  stripePaymentIntentId: string;
  /**
   * The PaymentIntent's client_secret. Only the paying customer may see it: checkout shows it on that customer's checkout and nowhere else.
   */
  clientSecret: string;
  /**
   * When payments cancels the PaymentIntent if the customer has not finished the action (10 minutes after it was created).
   */
  expiresAt: string;
  requiredAt: string;
}
