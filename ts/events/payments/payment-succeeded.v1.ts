// Generated from schemas/events/payments/payment-succeeded.v1.json. Do not edit.

/**
 * Reply to payments.request-payment: the PaymentIntent succeeded and the money is captured. Keyed by paymentId.
 */
export interface PaymentSucceededV1 {
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
  succeededAt: string;
}
