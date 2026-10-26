// Generated from schemas/commands/inventory/commit-reservation.v1.json. Do not edit.

/**
 * Command from checkout after the payment succeeded: turn the held stock into sold stock so it no longer expires. Replies: inventory.reservation-committed, or inventory.reservation-released (reason expired) when the reservation was already gone. Keyed by checkoutId.
 */
export interface CommitReservationV1 {
  checkoutId: string;
  reservationId: string;
  requestedAt: string;
}
