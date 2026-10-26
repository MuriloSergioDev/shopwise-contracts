// Generated from schemas/events/catalog/product-published.v1.json. Do not edit.

/**
 * A product became visible in the storefront. Carries its variants so consumers learn every sellable SKU at once.
 */
export interface ProductPublishedV1 {
  productId: string;
  slug: string;
  name: string;
  categoryId: string;
  /**
   * @minItems 1
   */
  variants: [
    {
      variantId: string;
      sku: string;
      name: string;
      /**
       * Option name to value, e.g. {"color": "Black", "size": "M"}.
       */
      options: {
        [k: string]: string;
      };
    },
    ...{
      variantId: string;
      sku: string;
      name: string;
      /**
       * Option name to value, e.g. {"color": "Black", "size": "M"}.
       */
      options: {
        [k: string]: string;
      };
    }[]
  ];
  publishedAt: string;
}
