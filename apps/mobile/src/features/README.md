# features/

## Why it exists

Feature-first organization (ADR-004). Each feature owns its screens, domain, data, validation, and tests.

## Features (scaffolded, empty)

authentication · dashboard · accounts · transactions · budgets · goals · investments · subscriptions · loans · reports · settings

## Standard feature layout

```text
<feature>/
├── components/     # feature-local UI
├── screens/        # route-level UI
├── hooks/          # orchestration (Screen → Hook → Repository)
├── domain/         # business rules / entities
├── data/
│   ├── repositories/
│   ├── datasources/
│   └── models/
├── navigation/     # feature stack
├── validation/     # Zod schemas
├── types/
└── __tests__/
```

## Rules

1. No cross-feature imports except deliberate public APIs.
2. Screens never access SQLite.
3. Hooks never execute SQL.
4. Datasources never import UI.
5. Do not implement business logic until that feature is scheduled.

## What must never go here

- App bootstrap / root providers → `app/`
- Design-system primitives → `shared/components`
- Database connection lifecycle → `core/database`
