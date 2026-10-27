<?php

declare(strict_types=1);

// Generated from schemas/events/orders/order-cancelled.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Orders;

/** Reply to orders.cancel-order: the checkout has no live order. orderId and number are set when an order had been placed and is now cancelled (notifications mails the customer); both are null when no order existed and any later place-order for the checkout will be rejected. Keyed by checkoutId. */
final readonly class OrderCancelledV1
{
    public const string TYPE = 'orders.order-cancelled';

    public const int VERSION = 1;

    public const string SCHEMA = 'orders/order-cancelled.v1';

    public function __construct(
        public string $checkoutId,
        public ?string $orderId,
        public ?string $number,
        public ?string $customerId,
        public ?string $email,
        public string $reason,
        public string $cancelledAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            orderId: $data['orderId'],
            number: $data['number'],
            customerId: $data['customerId'],
            email: $data['email'],
            reason: $data['reason'],
            cancelledAt: $data['cancelledAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'orderId' => $this->orderId,
            'number' => $this->number,
            'customerId' => $this->customerId,
            'email' => $this->email,
            'reason' => $this->reason,
            'cancelledAt' => $this->cancelledAt,
        ];
    }
}
