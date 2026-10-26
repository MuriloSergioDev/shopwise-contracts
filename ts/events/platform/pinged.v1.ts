// Generated from schemas/events/platform/pinged.v1.json. Do not edit.

/**
 * A ping was accepted by the template service. Exists only to prove the HTTP → outbox → Kafka → consumer path.
 */
export interface PingedV1 {
  pingId: string;
  message: string;
  requestedAt: string;
}
