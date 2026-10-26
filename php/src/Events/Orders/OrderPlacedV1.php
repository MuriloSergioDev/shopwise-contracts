<?php

declare(strict_types=1);

// Generated from schemas/events/orders/order-placed.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Orders;

/** Reply to orders.place-order: the order exists. Notifications mails a confirmation. Keyed by orderId. */
final readonly class OrderPlacedV1
{
    public const string TYPE = 'orders.order-placed';

    public const int VERSION = 1;

    public const string SCHEMA = 'orders/order-placed.v1';

    public function __construct(
        public string $orderId,
        public string $number,
        public string $checkoutId,
        public string $customerId,
        public string $email,
        public array $lines,
        public string $currency,
        public int $subtotal,
        public int $discount,
        public int $total,
        public string $couponCode,
        public array $shippingAddress,
        public string $placedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            orderId: $data['orderId'],
            number: $data['number'],
            checkoutId: $data['checkoutId'],
            customerId: $data['customerId'],
            email: $data['email'],
            lines: $data['lines'],
            currency: $data['currency'],
            subtotal: $data['subtotal'],
            discount: $data['discount'],
            total: $data['total'],
            couponCode: $data['couponCode'],
            shippingAddress: $data['shippingAddress'],
            placedAt: $data['placedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'orderId' => $this->orderId,
            'number' => $this->number,
            'checkoutId' => $this->checkoutId,
            'customerId' => $this->customerId,
            'email' => $this->email,
            'lines' => $this->lines,
            'currency' => $this->currency,
            'subtotal' => $this->subtotal,
            'discount' => $this->discount,
            'total' => $this->total,
            'couponCode' => $this->couponCode,
            'shippingAddress' => $this->shippingAddress,
            'placedAt' => $this->placedAt,
        ];
    }
}
