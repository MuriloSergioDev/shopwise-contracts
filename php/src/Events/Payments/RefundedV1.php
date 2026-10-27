<?php

declare(strict_types=1);

// Generated from schemas/events/payments/refunded.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Payments;

/** A succeeded payment was refunded. Either the reply to payments.refund-payment (always in full, reason from the command) or a refund made outside the saga, e.g. in the Stripe dashboard (reason external, from the charge.refunded webhook; may be partial, amount is what was refunded). Checkout ignores external refunds. Notifications mails the customer. Keyed by paymentId. */
final readonly class RefundedV1
{
    public const string TYPE = 'payments.refunded';

    public const int VERSION = 1;

    public const string SCHEMA = 'payments/refunded.v1';

    public function __construct(
        public string $paymentId,
        public string $checkoutId,
        public string $customerId,
        public int $amount,
        public string $currency,
        public string $reason,
        public string $stripeRefundId,
        public string $refundedAt,
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
            stripeRefundId: $data['stripeRefundId'],
            refundedAt: $data['refundedAt'],
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
            'stripeRefundId' => $this->stripeRefundId,
            'refundedAt' => $this->refundedAt,
        ];
    }
}
