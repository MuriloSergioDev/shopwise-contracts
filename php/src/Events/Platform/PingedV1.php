<?php

declare(strict_types=1);

// Generated from schemas/events/platform/pinged.v1.json by scripts/generate.mjs. Do not edit.

namespace Shopwise\Contracts\Events\Platform;

/** A ping was accepted by the template service. Exists only to prove the HTTP → outbox → Kafka → consumer path. */
final readonly class PingedV1
{
    public const string TYPE = 'platform.pinged';

    public const int VERSION = 1;

    public const string SCHEMA = 'platform/pinged.v1';

    public function __construct(
        public string $pingId,
        public string $message,
        public string $requestedAt,
    ) {}

    /** @param array<string, mixed> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            pingId: $data['pingId'],
            message: $data['message'],
            requestedAt: $data['requestedAt'],
        );
    }

    /** @return array<string, mixed> */
    public function toArray(): array
    {
        return [
            'pingId' => $this->pingId,
            'message' => $this->message,
            'requestedAt' => $this->requestedAt,
        ];
    }
}
