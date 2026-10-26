// Generated from schemas/commands/payments/refund-payment.v1.json. Do not edit.

/**
 * Compensation from checkout: undo the checkout's payment. Refunds it when it succeeded (idempotency key checkout-{checkoutId}-refund), cancels the PaymentIntent when it is not final, otherwise re-publishes the failure. Replies: payments.refunded or payments.payment-failed. Keyed by checkoutId.
 */
export interface RefundPaymentV1 {
  checkoutId: string;
  /**
   * Why the checkout is being undone.
   */
  reason: "reservation_expired" | "order_rejected" | "timeout";
  requestedAt: string;
}
