<?php

declare(strict_types=1);

// Generated from schemas/events/catalog/product-published.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Catalog;

/** A product became visible in the storefront. Carries its variants so consumers learn every sellable SKU at once. */
final readonly class ProductPublishedV1
{
    public const string TYPE = 'catalog.product-published';

    public const int VERSION = 1;

    public const string SCHEMA = 'catalog/product-published.v1';

    public function __construct(
        public string $productId,
        public string $slug,
        public string $name,
        public string $categoryId,
        public array $variants,
        public string $publishedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            productId: $data['productId'],
            slug: $data['slug'],
            name: $data['name'],
            categoryId: $data['categoryId'],
            variants: $data['variants'],
            publishedAt: $data['publishedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'productId' => $this->productId,
            'slug' => $this->slug,
            'name' => $this->name,
            'categoryId' => $this->categoryId,
            'variants' => $this->variants,
            'publishedAt' => $this->publishedAt,
        ];
    }
}
