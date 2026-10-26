// Generated from schemas/events/inventory/reservation-released.v1.json. Do not edit.

/**
 * A reservation's stock went back to available: on request (inventory.release-reservation) or because its TTL passed. Also the reply to commit-reservation when the reservation had already expired. Keyed by checkoutId.
 */
export interface ReservationReleasedV1 {
  /**
   * Null when the checkout never had a reservation.
   */
  reservationId: string | null;
  checkoutId: string;
  reason: "requested" | "expired";
  /**
   * Stock returned by this release; empty when there was nothing left to release.
   *
   * @maxItems 50
   */
  lines: {
    sku: string;
    quantity: number;
  }[];
  releasedAt: string;
}
