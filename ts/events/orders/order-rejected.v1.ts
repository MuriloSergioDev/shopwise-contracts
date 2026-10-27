// Generated from schemas/events/orders/order-rejected.v1.json. Do not edit.

/**
 * Reply to orders.place-order: no order was created. Checkout refunds and releases. Keyed by checkoutId.
 */
export interface OrderRejectedV1 {
  checkoutId: string;
  /**
   * invalid: the command failed validation; duplicate_conflict: the checkout already has an order with different contents; cancelled: orders.cancel-order arrived for this checkout before the place-order.
   */
  reason: "invalid" | "duplicate_conflict" | "cancelled";
  message: string | null;
  rejectedAt: string;
}
