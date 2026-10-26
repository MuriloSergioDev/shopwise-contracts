<?php

declare(strict_types=1);

// Generated from schemas/commands/inventory/commit-reservation.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Commands\Inventory;

/** Command from checkout after the payment succeeded: turn the held stock into sold stock so it no longer expires. Replies: inventory.reservation-committed, or inventory.reservation-released (reason expired) when the reservation was already gone. Keyed by checkoutId. */
final readonly class CommitReservationV1
{
    public const string TYPE = 'inventory.commit-reservation';

    public const int VERSION = 1;

    public const string SCHEMA = 'inventory/commit-reservation.v1';

    public function __construct(
        public string $checkoutId,
        public string $reservationId,
        public string $requestedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            reservationId: $data['reservationId'],
            requestedAt: $data['requestedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'reservationId' => $this->reservationId,
            'requestedAt' => $this->requestedAt,
        ];
    }
}
