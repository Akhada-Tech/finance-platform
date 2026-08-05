# core/database/

## Why it exists

SQLite is the source of truth (Architecture §10). This folder owns connection lifecycle, migrations, and repository/datasource infrastructure — not feature tables.

## What belongs here

| Path | Role |
|---|---|
| `migrations/` | Ordered schema migrations |
| `repositories/` | Base repository helpers / shared contracts |
| `datasources/` | Base datasource helpers for local SQLite access |
| (root) | Database service / initialization |

## What must never go here

- Feature-specific tables or SQL until that feature is implemented
- React / UI imports
- Direct MMKV usage (use `core/storage`)
- Cloud sync engines (future; keep behind interfaces)

## Layering reminder

```text
Feature Repository → Feature Datasource → SQLite (via this infrastructure)
```
