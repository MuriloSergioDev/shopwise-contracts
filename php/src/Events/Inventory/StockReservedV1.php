<?php

declare(strict_types=1);

// Generated from schemas/events/inventory/stock-reserved.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Inventory;

/** Reply to inventory.reserve-stock: every line is held until expiresAt. Keyed by checkoutId. */
final readonly class StockReservedV1
{
    public const string TYPE = 'inventory.stock-reserved';

    public const int VERSION = 1;

    public const string SCHEMA = 'inventory/stock-reserved.v1';

    public function __construct(
        public string $reservationId,
        public string $checkoutId,
        public array $lines,
        public string $expiresAt,
        public string $reservedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            reservationId: $data['reservationId'],
            checkoutId: $data['checkoutId'],
            lines: $data['lines'],
            expiresAt: $data['expiresAt'],
            reservedAt: $data['reservedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'reservationId' => $this->reservationId,
            'checkoutId' => $this->checkoutId,
            'lines' => $this->lines,
            'expiresAt' => $this->expiresAt,
            'reservedAt' => $this->reservedAt,
        ];
    }
}
