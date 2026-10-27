<?php

declare(strict_types=1);

// Generated from schemas/commands/orders/cancel-order.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Commands\Orders;

/** Compensation from checkout when the place-order step timed out: make sure the checkout ends with no live order. Cancels the checkout's order if one was placed; otherwise records the cancellation so a late place-order for this checkoutId is answered with orders.order-rejected (reason cancelled). Idempotent per checkoutId. Reply: orders.order-cancelled. Keyed by checkoutId. */
final readonly class CancelOrderV1
{
    public const string TYPE = 'orders.cancel-order';

    public const int VERSION = 1;

    public const string SCHEMA = 'orders/cancel-order.v1';

    public function __construct(
        public string $checkoutId,
        public string $reason,
        public string $requestedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            reason: $data['reason'],
            requestedAt: $data['requestedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'reason' => $this->reason,
            'requestedAt' => $this->requestedAt,
        ];
    }
}
