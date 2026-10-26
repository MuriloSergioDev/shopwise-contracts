<?php

declare(strict_types=1);

// Generated from schemas/events/cart/cart-checked-out.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Cart;

/** A completed checkout closed the cart; the customer gets a new one on next access. Lines are the checkout's snapshot. Keyed by cartId. */
final readonly class CartCheckedOutV1
{
    public const string TYPE = 'cart.cart-checked-out';

    public const int VERSION = 1;

    public const string SCHEMA = 'cart/cart-checked-out.v1';

    public function __construct(
        public string $cartId,
        public string $customerId,
        public string $checkoutId,
        public string $orderId,
        public array $lines,
        public string $checkedOutAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            cartId: $data['cartId'],
            customerId: $data['customerId'],
            checkoutId: $data['checkoutId'],
            orderId: $data['orderId'],
            lines: $data['lines'],
            checkedOutAt: $data['checkedOutAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'cartId' => $this->cartId,
            'customerId' => $this->customerId,
            'checkoutId' => $this->checkoutId,
            'orderId' => $this->orderId,
            'lines' => $this->lines,
            'checkedOutAt' => $this->checkedOutAt,
        ];
    }
}
