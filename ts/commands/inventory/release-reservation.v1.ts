// Generated from schemas/commands/inventory/release-reservation.v1.json. Do not edit.

/**
 * Compensation from checkout: return the checkout's held or committed stock. Looked up by checkoutId; releasing nothing is a no-op that still replies. Reply: inventory.reservation-released (reason requested). Keyed by checkoutId.
 */
export interface ReleaseReservationV1 {
  checkoutId: string;
  requestedAt: string;
}
