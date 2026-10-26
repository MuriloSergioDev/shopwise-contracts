// Generated from schemas/events/pricing/price-changed.v1.json. Do not edit.

/**
 * A SKU's price was set or changed. Full state, not a diff: consumers upsert by sku. Keyed by sku.
 */
export interface PriceChangedV1 {
  sku: string;
  /**
   * Unit price in minor units (cents).
   */
  amount: number;
  /**
   * ISO 4217 code.
   */
  currency: string;
  changedAt: string;
}
