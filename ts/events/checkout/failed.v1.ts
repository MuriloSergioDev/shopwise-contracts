// Generated from schemas/events/checkout/failed.v1.json. Do not edit.

/**
 * The saga failed and every compensation is confirmed: no stock held, no money kept, no order. Keyed by checkoutId.
 */
export interface FailedV1 {
  checkoutId: string;
  customerId: string;
  cartId: string;
  reason: "out_of_stock" | "payment_failed" | "reservation_expired" | "order_rejected" | "timeout";
  failedAt: string;
}
