<?php

declare(strict_types=1);

// Generated from schemas/commands/payments/refund-payment.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Commands\Payments;

/** Compensation from checkout: undo the checkout's payment. Refunds it in full when it succeeded (idempotency key checkout-{checkoutId}-refund), cancels the PaymentIntent when it is not final (requires_action included), otherwise re-publishes the failure. Replies: payments.refunded or payments.payment-failed. Keyed by checkoutId. */
final readonly class RefundPaymentV1
{
    public const string TYPE = 'payments.refund-payment';

    public const int VERSION = 1;

    public const string SCHEMA = 'payments/refund-payment.v1';

    public function __construct(
        public string $checkoutId,
        public string $reason,
        public string $requestedAt,
        public ?string $customerId = null,
        public ?int $amount = null,
        public ?string $currency = null,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            checkoutId: $data['checkoutId'],
            reason: $data['reason'],
            requestedAt: $data['requestedAt'],
            customerId: $data['customerId'] ?? null,
            amount: $data['amount'] ?? null,
            currency: $data['currency'] ?? null,
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        $data = [
            'checkoutId' => $this->checkoutId,
            'reason' => $this->reason,
            'requestedAt' => $this->requestedAt,
        ];
        if ($this->customerId !== null) {
            $data['customerId'] = $this->customerId;
        }
        if ($this->amount !== null) {
            $data['amount'] = $this->amount;
        }
        if ($this->currency !== null) {
            $data['currency'] = $this->currency;
        }

        return $data;
    }
}
