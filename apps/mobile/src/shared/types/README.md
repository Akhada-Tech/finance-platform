# shared/types/

## Why it exists

Small TypeScript types shared across features that are not domain entities (e.g. `Result`, UI variant unions).

## What belongs here

- Cross-cutting type aliases/unions
- Utility types used by shared components

## What must never go here

- Account / transaction / budget entities → feature `domain/` or `types/`
- Monorepo-wide API contracts → `packages/types`
