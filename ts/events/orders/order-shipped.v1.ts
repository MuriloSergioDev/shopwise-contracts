// Generated from schemas/events/orders/order-shipped.v1.json. Do not edit.

/**
 * An admin marked the order shipped. Notifications mails the tracking details. Keyed by orderId.
 */
export interface OrderShippedV1 {
  orderId: string;
  number: string;
  customerId: string;
  email: string;
  carrier: string;
  trackingNumber: string;
  shippedAt: string;
}
