<?php

declare(strict_types=1);

// Generated from schemas/commands/orders/place-order.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Commands\Orders;

/** Command from checkout once payment succeeded and stock is committed: record the order. One order per checkoutId. Replies: orders.order-placed or orders.order-rejected. Keyed by checkoutId. */
final readonly class PlaceOrderV1
{
    public const string TYPE = 'orders.place-order';

    public const int VERSION = 1;

    public const string SCHEMA = 'orders/place-order.v1';

    public function __construct(
        public string $checkoutId,
        public string $customerId,
        public string $email,
        public array $lines,
        public string $currency,
        public int $subtotal,
        public int $discount,
        public int $total,
        public ?string $couponCode,
        public string $paymentId,
        public array $shippingAddress,
        public string $requestedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            customerId: $data['customerId'],
            email: $data['email'],
            lines: $data['lines'],
            currency: $data['currency'],
            subtotal: $data['subtotal'],
            discount: $data['discount'],
            total: $data['total'],
            couponCode: $data['couponCode'],
            paymentId: $data['paymentId'],
            shippingAddress: $data['shippingAddress'],
            requestedAt: $data['requestedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'customerId' => $this->customerId,
            'email' => $this->email,
            'lines' => $this->lines,
            'currency' => $this->currency,
            'subtotal' => $this->subtotal,
            'discount' => $this->discount,
            'total' => $this->total,
            'couponCode' => $this->couponCode,
            'paymentId' => $this->paymentId,
            'shippingAddress' => $this->shippingAddress,
            'requestedAt' => $this->requestedAt,
        ];
    }
}
