// Generated from schemas/events/inventory/reservation-committed.v1.json. Do not edit.

/**
 * Reply to inventory.commit-reservation: the held stock is now sold and no longer expires. Keyed by checkoutId.
 */
export interface ReservationCommittedV1 {
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
  committedAt: string;
}
