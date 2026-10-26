// Generated from schemas/events/checkout/completed.v1.json. Do not edit.

/**
 * The saga finished: stock committed, payment captured, order placed, cart closed. Pricing records the coupon redemption from it. Keyed by checkoutId.
 */
export interface CompletedV1 {
  checkoutId: string;
  customerId: string;
  cartId: string;
  orderId: string;
  paymentId: string;
  /**
   * ISO 4217 code.
   */
  currency: string;
  /**
   * Minor units (cents).
   */
  subtotal: number;
  /**
   * Minor units; never more than the subtotal.
   */
  discount: number;
  /**
   * Minor units (cents).
   */
  total: number;
  couponCode: string | null;
  completedAt: string;
}
