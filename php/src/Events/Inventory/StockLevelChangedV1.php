<?php

declare(strict_types=1);

// Generated from schemas/events/inventory/stock-level-changed.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Inventory;

/** A SKU's stock changed (admin set on-hand, reservation, commit, release). Full state, not a diff: consumers upsert by sku and keep the newest changedAt. Keyed by sku. */
final readonly class StockLevelChangedV1
{
    public const string TYPE = 'inventory.stock-level-changed';

    public const int VERSION = 1;

    public const string SCHEMA = 'inventory/stock-level-changed.v1';

    public function __construct(
        public string $sku,
        public int $onHand,
        public int $reserved,
        public int $available,
        public string $changedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            sku: $data['sku'],
            onHand: $data['onHand'],
            reserved: $data['reserved'],
            available: $data['available'],
            changedAt: $data['changedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'sku' => $this->sku,
            'onHand' => $this->onHand,
            'reserved' => $this->reserved,
            'available' => $this->available,
            'changedAt' => $this->changedAt,
        ];
    }
}
