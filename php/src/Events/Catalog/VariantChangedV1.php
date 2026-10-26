<?php

declare(strict_types=1);

// Generated from schemas/events/catalog/variant-changed.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Catalog;

/** A variant was created or changed (including deactivation). Full state, not a diff: consumers upsert by variantId. Keyed by productId. */
final readonly class VariantChangedV1
{
    public const string TYPE = 'catalog.variant-changed';

    public const int VERSION = 1;

    public const string SCHEMA = 'catalog/variant-changed.v1';

    public function __construct(
        public string $variantId,
        public string $productId,
        public string $sku,
        public string $name,
        public array $options,
        public bool $active,
        public string $changedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            variantId: $data['variantId'],
            productId: $data['productId'],
            sku: $data['sku'],
            name: $data['name'],
            options: $data['options'],
            active: $data['active'],
            changedAt: $data['changedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'variantId' => $this->variantId,
            'productId' => $this->productId,
            'sku' => $this->sku,
            'name' => $this->name,
            'options' => $this->options,
            'active' => $this->active,
            'changedAt' => $this->changedAt,
        ];
    }
}
