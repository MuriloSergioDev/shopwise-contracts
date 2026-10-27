<?php

declare(strict_types=1);

// Generated from schemas/events/payments/payment-requires-action.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Payments;

/** Interim reply to payments.request-payment: the PaymentIntent is in requires_action (3-D Secure). The customer must complete it in the storefront with stripe.handleNextAction(clientSecret). No money is taken yet; payments later publishes payments.payment-succeeded or payments.payment-failed (from the Stripe webhook, or failed with reason timeout at expiresAt). A re-sent request-payment re-publishes this event while the action is pending. Keyed by paymentId. */
final readonly class PaymentRequiresActionV1
{
    public const string TYPE = 'payments.payment-requires-action';

    public const int VERSION = 1;

    public const string SCHEMA = 'payments/payment-requires-action.v1';

    public function __construct(
        public string $paymentId,
        public string $checkoutId,
        public string $customerId,
        public int $amount,
        public string $currency,
        public string $stripePaymentIntentId,
        public string $clientSecret,
        public string $expiresAt,
        public string $requiredAt,
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
            clientSecret: $data['clientSecret'],
            expiresAt: $data['expiresAt'],
            requiredAt: $data['requiredAt'],
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
            'clientSecret' => $this->clientSecret,
            'expiresAt' => $this->expiresAt,
            'requiredAt' => $this->requiredAt,
        ];
    }
}
