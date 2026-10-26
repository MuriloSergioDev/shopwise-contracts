<?php

declare(strict_types=1);

// Generated from schemas/events/inventory/reservation-failed.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Inventory;

/** Reply to inventory.reserve-stock: nothing was held because at least one line could not be. Keyed by checkoutId. */
final readonly class ReservationFailedV1
{
    public const string TYPE = 'inventory.reservation-failed';

    public const int VERSION = 1;

    public const string SCHEMA = 'inventory/reservation-failed.v1';

    public function __construct(
        public string $checkoutId,
        public string $reason,
        public array $lines,
        public string $failedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            reason: $data['reason'],
            lines: $data['lines'],
            failedAt: $data['failedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'reason' => $this->reason,
            'lines' => $this->lines,
            'failedAt' => $this->failedAt,
        ];
    }
}
