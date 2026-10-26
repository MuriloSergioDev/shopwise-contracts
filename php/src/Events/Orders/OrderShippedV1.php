<?php

declare(strict_types=1);

// Generated from schemas/events/orders/order-shipped.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Orders;

/** An admin marked the order shipped. Notifications mails the tracking details. Keyed by orderId. */
final readonly class OrderShippedV1
{
    public const string TYPE = 'orders.order-shipped';

    public const int VERSION = 1;

    public const string SCHEMA = 'orders/order-shipped.v1';

    public function __construct(
        public string $orderId,
        public string $number,
        public string $customerId,
        public string $email,
        public string $carrier,
        public string $trackingNumber,
        public string $shippedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            orderId: $data['orderId'],
            number: $data['number'],
            customerId: $data['customerId'],
            email: $data['email'],
            carrier: $data['carrier'],
            trackingNumber: $data['trackingNumber'],
            shippedAt: $data['shippedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'orderId' => $this->orderId,
            'number' => $this->number,
            'customerId' => $this->customerId,
            'email' => $this->email,
            'carrier' => $this->carrier,
            'trackingNumber' => $this->trackingNumber,
            'shippedAt' => $this->shippedAt,
        ];
    }
}
