// Generated from schemas/commands/payments/refund-payment.v1.json. Do not edit.

/**
 * Compensation from checkout: undo the checkout's payment. Refunds it in full when it succeeded (idempotency key checkout-{checkoutId}-refund), cancels the PaymentIntent when it is not final (requires_action included), otherwise re-publishes the failure. Replies: payments.refunded or payments.payment-failed. Keyed by checkoutId.
 */
export interface RefundPaymentV1 {
  checkoutId: string;
  /**
   * Why the checkout is being undone.
   */
  reason: "reservation_expired" | "order_rejected" | "timeout";
  /**
   * The checkout's customer. Optional only for compatibility: checkout always sends customerId, amount and currency. When they disagree with the payment, payments logs an error and does not refund.
   */
  customerId?: string;
  /**
   * Minor units (cents) the checkout charged: the quote total.
   */
  amount?: number;
  /**
   * ISO 4217 code.
   */
  currency?: string;
  requestedAt: string;
}
