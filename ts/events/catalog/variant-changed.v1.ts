// Generated from schemas/events/catalog/variant-changed.v1.json. Do not edit.

/**
 * A variant was created or changed (including deactivation). Full state, not a diff: consumers upsert by variantId. Keyed by productId.
 */
export interface VariantChangedV1 {
  variantId: string;
  productId: string;
  sku: string;
  name: string;
  /**
   * Variant options sorted by name, e.g. color=Black and size=M. A list, not a map, so an empty set stays a JSON array through the outbox.
   */
  options: {
    name: string;
    value: string;
  }[];
  /**
   * False once the variant can no longer be sold.
   */
  active: boolean;
  changedAt: string;
}
