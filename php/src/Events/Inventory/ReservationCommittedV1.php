<?php

declare(strict_types=1);

// Generated from schemas/events/inventory/reservation-committed.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Inventory;

/** Reply to inventory.commit-reservation: the held stock is now sold and no longer expires. Keyed by checkoutId. */
final readonly class ReservationCommittedV1
{
    public const string TYPE = 'inventory.reservation-committed';

    public const int VERSION = 1;

    public const string SCHEMA = 'inventory/reservation-committed.v1';

    public function __construct(
        public string $reservationId,
        public string $checkoutId,
        public array $lines,
        public string $committedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            reservationId: $data['reservationId'],
            checkoutId: $data['checkoutId'],
            lines: $data['lines'],
            committedAt: $data['committedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'reservationId' => $this->reservationId,
            'checkoutId' => $this->checkoutId,
            'lines' => $this->lines,
            'committedAt' => $this->committedAt,
        ];
    }
}
