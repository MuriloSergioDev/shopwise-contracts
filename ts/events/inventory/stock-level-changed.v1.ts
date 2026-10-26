// Generated from schemas/events/inventory/stock-level-changed.v1.json. Do not edit.

/**
 * A SKU's stock changed (admin set on-hand, reservation, commit, release). Full state, not a diff: consumers upsert by sku and keep the newest changedAt. Keyed by sku.
 */
export interface StockLevelChangedV1 {
  sku: string;
  /**
   * Physically in stock, including reserved units not yet committed.
   */
  onHand: number;
  /**
   * Held by open reservations.
   */
  reserved: number;
  /**
   * onHand - reserved: what can still be reserved.
   */
  available: number;
  changedAt: string;
}
