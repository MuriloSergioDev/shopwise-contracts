// Generated from schemas/events/cart/cart-checked-out.v1.json. Do not edit.

/**
 * A completed checkout closed the cart; the customer gets a new one on next access. Lines are the checkout's snapshot. Keyed by cartId.
 */
export interface CartCheckedOutV1 {
  cartId: string;
  customerId: string;
  checkoutId: string;
  orderId: string;
  /**
   * @minItems 1
   * @maxItems 50
   */
  lines: [
    {
      sku: string;
      quantity: number;
    },
    ...{
      sku: string;
      quantity: number;
    }[]
  ];
  checkedOutAt: string;
}
