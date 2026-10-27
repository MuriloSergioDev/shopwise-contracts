<?php

declare(strict_types=1);

// Generated from schemas/commands/payments/request-payment.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Commands\Payments;

/** Command from checkout: create and confirm a Stripe PaymentIntent for the checkout (idempotency key checkout-{checkoutId}-pay). One payment per checkoutId. Replies: payments.payment-succeeded or payments.payment-failed within 5 minutes; when the card needs 3-D Secure, first payments.payment-requires-action, then the final reply by its expiresAt (10 minutes). Keyed by checkoutId. */
final readonly class RequestPaymentV1
{
    public const string TYPE = 'payments.request-payment';

    public const int VERSION = 1;

    public const string SCHEMA = 'payments/request-payment.v1';

    public function __construct(
        public string $checkoutId,
        public string $customerId,
        public int $amount,
        public string $currency,
        public string $paymentMethodId,
        public string $requestedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            customerId: $data['customerId'],
            amount: $data['amount'],
            currency: $data['currency'],
            paymentMethodId: $data['paymentMethodId'],
            requestedAt: $data['requestedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'customerId' => $this->customerId,
            'amount' => $this->amount,
            'currency' => $this->currency,
            'paymentMethodId' => $this->paymentMethodId,
            'requestedAt' => $this->requestedAt,
        ];
    }
}
