// Generated from schemas/commands/orders/cancel-order.v1.json. Do not edit.

/**
 * Compensation from checkout when the place-order step timed out: make sure the checkout ends with no live order. Cancels the checkout's order if one was placed; otherwise records the cancellation so a late place-order for this checkoutId is answered with orders.order-rejected (reason cancelled). Idempotent per checkoutId. Reply: orders.order-cancelled. Keyed by checkoutId.
 */
export interface CancelOrderV1 {
  checkoutId: string;
  /**
   * Why the order is being cancelled: the saga's place-order step timed out.
   */
  reason: "timeout";
  requestedAt: string;
}
