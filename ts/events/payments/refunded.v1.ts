// Generated from schemas/events/payments/refunded.v1.json. Do not edit.

/**
 * A succeeded payment was refunded in full; the reply to payments.refund-payment. Notifications mails the customer. Keyed by paymentId.
 */
export interface RefundedV1 {
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
  reason: "reservation_expired" | "order_rejected" | "timeout";
  stripeRefundId: string;
  refundedAt: string;
}
