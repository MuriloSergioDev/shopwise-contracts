<?php

declare(strict_types=1);

// Generated from schemas/commands/inventory/reserve-stock.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Commands\Inventory;

/** Command from checkout: hold stock for a checkout's lines, all or nothing. One reservation per checkoutId; a repeated command re-publishes the outcome. Replies: inventory.stock-reserved or inventory.reservation-failed. Keyed by checkoutId. */
final readonly class ReserveStockV1
{
    public const string TYPE = 'inventory.reserve-stock';

    public const int VERSION = 1;

    public const string SCHEMA = 'inventory/reserve-stock.v1';

    public function __construct(
        public string $checkoutId,
        public array $lines,
        public string $requestedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            lines: $data['lines'],
            requestedAt: $data['requestedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'lines' => $this->lines,
            'requestedAt' => $this->requestedAt,
        ];
    }
}
