<?php

declare(strict_types=1);

// Generated from schemas/events/identity/customer-registered.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Identity;

/** A customer created an account. Carries the contact data notifications needs for the welcome mail. */
final readonly class CustomerRegisteredV1
{
    public const string TYPE = 'identity.customer-registered';

    public const int VERSION = 1;

    public const string SCHEMA = 'identity/customer-registered.v1';

    public function __construct(
        public string $customerId,
        public string $email,
        public string $name,
        public string $registeredAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            customerId: $data['customerId'],
            email: $data['email'],
            name: $data['name'],
            registeredAt: $data['registeredAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'customerId' => $this->customerId,
            'email' => $this->email,
            'name' => $this->name,
            'registeredAt' => $this->registeredAt,
        ];
    }
}
