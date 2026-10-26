<?php

declare(strict_types=1);

// Generated from schemas/events/payments/payment-failed.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Payments;

/** Reply to payments.request-payment or payments.refund-payment: no money was taken (declined, canceled or timed out). Keyed by paymentId. */
final readonly class PaymentFailedV1
{
    public const string TYPE = 'payments.payment-failed';

    public const int VERSION = 1;

    public const string SCHEMA = 'payments/payment-failed.v1';

    public function __construct(
        public string $paymentId,
        public string $checkoutId,
        public string $customerId,
        public int $amount,
        public string $currency,
        public string $reason,
        public string $message,
        public string $stripePaymentIntentId,
        public string $failedAt,
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
            reason: $data['reason'],
            message: $data['message'],
            stripePaymentIntentId: $data['stripePaymentIntentId'],
            failedAt: $data['failedAt'],
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
            'reason' => $this->reason,
            'message' => $this->message,
            'stripePaymentIntentId' => $this->stripePaymentIntentId,
            'failedAt' => $this->failedAt,
        ];
    }
}
