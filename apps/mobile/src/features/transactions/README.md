# features/transactions

## Why it exists

Owns all Transactions-related product behavior: UI, domain rules, validation, and data access for this feature.

## What belongs here

- `screens/` — route-level UI
- `components/` — UI reused only inside this feature
- `hooks/` — orchestration (Screen → Hook → Repository)
- `domain/` — entities and business rules
- `data/repositories/` — business-friendly APIs (no SQL in the name)
- `data/datasources/` — SQLite today, cloud later
- `data/models/` — persistence models / mappers
- `navigation/` — this feature’s stack
- `validation/` — Zod schemas
- `types/` — feature-local TypeScript types
- `__tests__/` — unit and integration tests

## What must never go here

- Imports from other features (except a deliberate public API)
- Direct SQLite access from screens or hooks
- Design-system primitives (use `shared/components`)
- App bootstrap / root navigation composition (use `app/`)

## Status

Scaffold only. No business logic yet.
