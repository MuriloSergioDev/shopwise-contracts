// Generated from schemas/events/orders/order-placed.v1.json. Do not edit.

/**
 * Reply to orders.place-order: the order exists. Notifications mails a confirmation. Keyed by orderId.
 */
export interface OrderPlacedV1 {
  orderId: string;
  /**
   * Human-readable order number.
   */
  number: string;
  checkoutId: string;
  customerId: string;
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
  placedAt: string;
}
