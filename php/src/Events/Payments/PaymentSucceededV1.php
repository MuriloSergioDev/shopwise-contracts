<?php

declare(strict_types=1);

// Generated from schemas/events/payments/payment-succeeded.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Payments;

/** Reply to payments.request-payment: the PaymentIntent succeeded and the money is captured. Keyed by paymentId. */
final readonly class PaymentSucceededV1
{
    public const string TYPE = 'payments.payment-succeeded';

    public const int VERSION = 1;

    public const string SCHEMA = 'payments/payment-succeeded.v1';

    public function __construct(
        public string $paymentId,
        public string $checkoutId,
        public string $customerId,
        public int $amount,
        public string $currency,
        public string $stripePaymentIntentId,
        public string $succeededAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            paymentId: $data['paymentId'],
            checkoutId: $data['checkoutId'],
            customerId: $data['customerId'],
            amount: $data['amount'],
            currency: $data['currency'],
            stripePaymentIntentId: $data['stripePaymentIntentId'],
            succeededAt: $data['succeededAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'paymentId' => $this->paymentId,
            'checkoutId' => $this->checkoutId,
            'customerId' => $this->customerId,
            'amount' => $this->amount,
            'currency' => $this->currency,
            'stripePaymentIntentId' => $this->stripePaymentIntentId,
            'succeededAt' => $this->succeededAt,
        ];
    }
}
