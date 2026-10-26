// Generated from schemas/commands/inventory/reserve-stock.v1.json. Do not edit.

/**
 * Command from checkout: hold stock for a checkout's lines, all or nothing. One reservation per checkoutId; a repeated command re-publishes the outcome. Replies: inventory.stock-reserved or inventory.reservation-failed. Keyed by checkoutId.
 */
export interface ReserveStockV1 {
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
  requestedAt: string;
}
