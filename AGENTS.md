# shopwise-contracts

Single source of truth for every Shopwise contract: Kafka event payloads and service HTTP APIs.
Consumers install it as `shopwise/contracts` (Composer, VCS) and `@shopwise/contracts` (pnpm, git).

## Layout
- `schemas/envelope.json` — message envelope (ADR-0002 in shopwise-platform).
- `schemas/events/<context>/<event>.v<N>.json` — payload (`data`) schema per event version. Draft 2020-12, `additionalProperties: false`.
- `schemas/commands/<receiver>/<command>.v<N>.json` — checkout saga commands (ADR-0004), same envelope and rules as events; the receiver owns the topic. Generated into `Shopwise\Contracts\Commands\…` and `ts/commands/`.
- `examples/<context>.<event>.v<N>.json` — one full envelope per schema; consumers use it as a test fixture.
- `asyncapi.yaml` — catalog of channels (topic = `<context>.<event>` or `<receiver>.<command>`), owner in each description.
- `openapi/<service>.yaml` — OpenAPI 3.1 per service.
- `php/src/`, `ts/` — **generated** by `pnpm generate`; committed so consumers can install from git.

## Rules
- A published version file is append-only in spirit: compatible changes (new optional field) go in place; anything breaking becomes `v<N+1>` next to it. `pnpm compat` enforces BACKWARD compatibility through Apicurio.
- Every schema needs an example and an AsyncAPI channel — `pnpm check` fails otherwise.
- Edit sources only; regenerate instead of editing `php/` or `ts/`.

## Commands
`pnpm check` (validate + regenerate + no-diff + typecheck), `pnpm roundtrip` (every example, plus each nullable field as null, through its PHP DTO; docker `shopwise-php:base`, CI uses `php:8.5-cli`), `pnpm compat` (needs Apicurio: Tilt port-forward 8081 or `REGISTRY_URL`).
