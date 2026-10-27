<?php

declare(strict_types=1);

// Generated from schemas/events/inventory/reservation-released.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Inventory;

/** A reservation's stock went back to available: on request (inventory.release-reservation) or because its TTL passed. Also the reply to commit-reservation when the reservation had already expired. Keyed by checkoutId. */
final readonly class ReservationReleasedV1
{
    public const string TYPE = 'inventory.reservation-released';

    public const int VERSION = 1;

    public const string SCHEMA = 'inventory/reservation-released.v1';

    public function __construct(
        public ?string $reservationId,
        public string $checkoutId,
        public string $reason,
        public array $lines,
        public string $releasedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            reservationId: $data['reservationId'],
            checkoutId: $data['checkoutId'],
            reason: $data['reason'],
            lines: $data['lines'],
            releasedAt: $data['releasedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'reservationId' => $this->reservationId,
            'checkoutId' => $this->checkoutId,
            'reason' => $this->reason,
            'lines' => $this->lines,
            'releasedAt' => $this->releasedAt,
        ];
    }
}
