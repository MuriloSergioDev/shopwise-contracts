// Generated from schemas/events/inventory/stock-reserved.v1.json. Do not edit.

/**
 * Reply to inventory.reserve-stock: every line is held until expiresAt. Keyed by checkoutId.
 */
export interface StockReservedV1 {
  reservationId: string;
  checkoutId: string;
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
  expiresAt: string;
  reservedAt: string;
}
