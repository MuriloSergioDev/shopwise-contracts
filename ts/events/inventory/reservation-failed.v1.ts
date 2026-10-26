// Generated from schemas/events/inventory/reservation-failed.v1.json. Do not edit.

/**
 * Reply to inventory.reserve-stock: nothing was held because at least one line could not be. Keyed by checkoutId.
 */
export interface ReservationFailedV1 {
  checkoutId: string;
  reason: "insufficient_stock" | "unknown_sku";
  /**
   * Only the lines that could not be reserved.
   *
   * @minItems 1
   * @maxItems 50
   */
  lines: [
    {
      sku: string;
      requested: number;
      available: number;
    },
    ...{
      sku: string;
      requested: number;
      available: number;
    }[]
  ];
  failedAt: string;
}
