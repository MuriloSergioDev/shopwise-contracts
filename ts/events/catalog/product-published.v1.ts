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
       * Variant options sorted by name, e.g. color=Black and size=M. A list, not a map, so an empty set stays a JSON array through the outbox.
       */
      options: {
        name: string;
        value: string;
      }[];
    },
    ...{
      variantId: string;
      sku: string;
      name: string;
      /**
       * Variant options sorted by name, e.g. color=Black and size=M. A list, not a map, so an empty set stays a JSON array through the outbox.
       */
      options: {
        name: string;
        value: string;
      }[];
    }[]
  ];
  publishedAt: string;
}
