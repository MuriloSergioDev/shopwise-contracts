<?php

declare(strict_types=1);

// Generated from schemas/events/orders/order-rejected.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Orders;

/** Reply to orders.place-order: no order was created. Checkout refunds and releases. Keyed by checkoutId. */
final readonly class OrderRejectedV1
{
    public const string TYPE = 'orders.order-rejected';

    public const int VERSION = 1;

    public const string SCHEMA = 'orders/order-rejected.v1';

    public function __construct(
        public string $checkoutId,
        public string $reason,
        public string $message,
        public string $rejectedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            reason: $data['reason'],
            message: $data['message'],
            rejectedAt: $data['rejectedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'reason' => $this->reason,
            'message' => $this->message,
            'rejectedAt' => $this->rejectedAt,
        ];
    }
}
