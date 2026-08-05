# packages/

## Why it exists

Holds shared tooling and contracts used by two or more apps.

## What belongs here

- Shared ESLint / TypeScript configs
- Cross-app type contracts
- Future shared libraries only after real duplication (Architecture Rule 3)

## What must never go here

- Feature business logic
- Mobile-only UI
- Premature abstractions for a single consumer
