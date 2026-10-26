// Generated from schemas/commands/orders/place-order.v1.json. Do not edit.

/**
 * Command from checkout once payment succeeded and stock is committed: record the order. One order per checkoutId. Replies: orders.order-placed or orders.order-rejected. Keyed by checkoutId.
 */
export interface PlaceOrderV1 {
  checkoutId: string;
  customerId: string;
  /**
   * From the access token at checkout time; where order mail goes.
   */
  email: string;
  /**
   * @minItems 1
   * @maxItems 50
   */
  lines: [
    {
      sku: string;
      /**
       * Display name at checkout time; null if the cart had none.
       */
      productName: string | null;
      variantName: string;
      quantity: number;
      /**
       * Minor units (cents).
       */
      unitAmount: number;
      /**
       * Minor units (cents).
       */
      lineAmount: number;
    },
    ...{
      sku: string;
      /**
       * Display name at checkout time; null if the cart had none.
       */
      productName: string | null;
      variantName: string;
      quantity: number;
      /**
       * Minor units (cents).
       */
      unitAmount: number;
      /**
       * Minor units (cents).
       */
      lineAmount: number;
    }[]
  ];
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
  paymentId: string;
  /**
   * Where the order ships to.
   */
  shippingAddress: {
    name: string;
    line1: string;
    line2: string | null;
    city: string;
    region: string | null;
    postalCode: string;
    /**
     * ISO 3166-1 alpha-2.
     */
    country: string;
  };
  requestedAt: string;
}
