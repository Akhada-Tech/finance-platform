# core/

## Why it exists

Infrastructure that features and shared code depend on. Keeps SQLite, MMKV, config, logging, and security behind stable modules so the UI never talks to native storage APIs directly.

## Stack (foundation)

| Concern | Implementation |
|---|---|
| Config | `core/config` — typed `AppConfig`, no secrets |
| Logging | `core/logging` — `Logger` + console implementation |
| Storage | `KeyValueStorage` → MMKV (memory in tests) |
| Database | `DatabaseConnection` → Nitro SQLite (memory in tests) |
| Migrations | `schema_migrations` runner; business migrations empty for now |
| Security | Secrets storage façade (`getSecureStorage`) |

## Pattern

```text
Feature Repository → Feature Datasource → DatabaseConnection (SQLite)
Screens / hooks → KeyValueStorage (never MMKV directly)
```

## What must never go here

- React components or screens
- Feature domain entities
- Imports from `features/` or `shared/`
- Cloud SDK usage that leaks into the UI layer (keep behind interfaces)
