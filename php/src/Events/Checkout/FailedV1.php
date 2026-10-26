<?php

declare(strict_types=1);

// Generated from schemas/events/checkout/failed.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Checkout;

/** The saga failed and every compensation is confirmed: no stock held, no money kept, no order. Keyed by checkoutId. */
final readonly class FailedV1
{
    public const string TYPE = 'checkout.failed';

    public const int VERSION = 1;

    public const string SCHEMA = 'checkout/failed.v1';

    public function __construct(
        public string $checkoutId,
        public string $customerId,
        public string $cartId,
        public string $reason,
        public string $failedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            customerId: $data['customerId'],
            cartId: $data['cartId'],
            reason: $data['reason'],
            failedAt: $data['failedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'customerId' => $this->customerId,
            'cartId' => $this->cartId,
            'reason' => $this->reason,
            'failedAt' => $this->failedAt,
        ];
    }
}
