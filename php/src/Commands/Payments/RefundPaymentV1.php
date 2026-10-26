<?php

declare(strict_types=1);

// Generated from schemas/commands/payments/refund-payment.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Commands\Payments;

/** Compensation from checkout: undo the checkout's payment. Refunds it when it succeeded (idempotency key checkout-{checkoutId}-refund), cancels the PaymentIntent when it is not final, otherwise re-publishes the failure. Replies: payments.refunded or payments.payment-failed. Keyed by checkoutId. */
final readonly class RefundPaymentV1
{
    public const string TYPE = 'payments.refund-payment';

    public const int VERSION = 1;

    public const string SCHEMA = 'payments/refund-payment.v1';

    public function __construct(
        public string $checkoutId,
        public string $reason,
        public string $requestedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            reason: $data['reason'],
            requestedAt: $data['requestedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'checkoutId' => $this->checkoutId,
            'reason' => $this->reason,
            'requestedAt' => $this->requestedAt,
        ];
    }
}
