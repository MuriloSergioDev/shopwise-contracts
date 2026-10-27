// Generated from schemas/events/payments/refunded.v1.json. Do not edit.

/**
 * A succeeded payment was refunded. Either the reply to payments.refund-payment (always in full, reason from the command) or a refund made outside the saga, e.g. in the Stripe dashboard (reason external, from the charge.refunded webhook; may be partial, amount is what was refunded). Checkout ignores external refunds. Notifications mails the customer. Keyed by paymentId.
 */
export interface RefundedV1 {
  paymentId: string;
  checkoutId: string;
  customerId: string;
  /**
   * Minor units (cents) refunded.
   */
  amount: number;
  /**
   * ISO 4217 code.
   */
  currency: string;
  /**
   * The refund-payment reason, or external for a refund checkout did not ask for.
   */
  reason: "reservation_expired" | "order_rejected" | "timeout" | "external";
  stripeRefundId: string;
  refundedAt: string;
}
