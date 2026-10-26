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
   * Option name to value, e.g. {"color": "Black", "size": "M"}.
   */
  options: {
    [k: string]: string;
  };
  /**
   * False once the variant can no longer be sold.
   */
  active: boolean;
  changedAt: string;
}
