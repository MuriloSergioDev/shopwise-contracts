<?php

declare(strict_types=1);

// Generated from schemas/events/checkout/completed.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Checkout;

/** The saga finished: stock committed, payment captured, order placed, cart closed. Pricing records the coupon redemption from it. Keyed by checkoutId. */
final readonly class CompletedV1
{
    public const string TYPE = 'checkout.completed';

    public const int VERSION = 1;

    public const string SCHEMA = 'checkout/completed.v1';

    public function __construct(
        public string $checkoutId,
        public string $customerId,
        public string $cartId,
        public string $orderId,
        public string $paymentId,
        public string $currency,
        public int $subtotal,
        public int $discount,
        public int $total,
        public string $couponCode,
        public string $completedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            customerId: $data['customerId'],
            cartId: $data['cartId'],
            orderId: $data['orderId'],
            paymentId: $data['paymentId'],
            currency: $data['currency'],
            subtotal: $data['subtotal'],
            discount: $data['discount'],
            total: $data['total'],
            couponCode: $data['couponCode'],
            completedAt: $data['completedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'customerId' => $this->customerId,
            'cartId' => $this->cartId,
            'orderId' => $this->orderId,
            'paymentId' => $this->paymentId,
            'currency' => $this->currency,
            'subtotal' => $this->subtotal,
            'discount' => $this->discount,
            'total' => $this->total,
            'couponCode' => $this->couponCode,
            'completedAt' => $this->completedAt,
        ];
    }
}
