<?php

declare(strict_types=1);

// Generated from schemas/events/pricing/price-changed.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Pricing;

/** A SKU's price was set or changed. Full state, not a diff: consumers upsert by sku. Keyed by sku. */
final readonly class PriceChangedV1
{
    public const string TYPE = 'pricing.price-changed';

    public const int VERSION = 1;

    public const string SCHEMA = 'pricing/price-changed.v1';

    public function __construct(
        public string $sku,
        public int $amount,
        public string $currency,
        public string $changedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            sku: $data['sku'],
            amount: $data['amount'],
            currency: $data['currency'],
            changedAt: $data['changedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'sku' => $this->sku,
            'amount' => $this->amount,
            'currency' => $this->currency,
            'changedAt' => $this->changedAt,
        ];
    }
}
