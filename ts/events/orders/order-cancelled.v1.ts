// Generated from schemas/events/orders/order-cancelled.v1.json. Do not edit.

/**
 * Reply to orders.cancel-order: the checkout has no live order. orderId and number are set when an order had been placed and is now cancelled (notifications mails the customer); both are null when no order existed and any later place-order for the checkout will be rejected. Keyed by checkoutId.
 */
export interface OrderCancelledV1 {
  checkoutId: string;
  /**
   * Null when no order had been placed.
   */
  orderId: string | null;
  /**
   * The cancelled order's number; null when no order had been placed.
   */
  number: string | null;
  /**
   * Null when no order had been placed.
   */
  customerId: string | null;
  /**
   * Where the cancellation mail goes; null when no order had been placed.
   */
  email: string | null;
  /**
   * The reason from orders.cancel-order.
   */
  reason: "timeout";
  cancelledAt: string;
}
