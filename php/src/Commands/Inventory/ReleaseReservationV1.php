<?php

declare(strict_types=1);

// Generated from schemas/commands/inventory/release-reservation.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Commands\Inventory;

/** Compensation from checkout: return the checkout's held or committed stock. Looked up by checkoutId; releasing nothing is a no-op that still replies. Reply: inventory.reservation-released (reason requested). Keyed by checkoutId. */
final readonly class ReleaseReservationV1
{
    public const string TYPE = 'inventory.release-reservation';

    public const int VERSION = 1;

    public const string SCHEMA = 'inventory/release-reservation.v1';

    public function __construct(
        public string $checkoutId,
        public string $requestedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            requestedAt: $data['requestedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'requestedAt' => $this->requestedAt,
        ];
    }
}
