# core/

## Why it exists

Infrastructure that features and shared code depend on. Keeps SQLite, MMKV, config, logging, and security behind stable modules so the UI never talks to native storage APIs directly.

## What belongs here

| Folder | Role |
|---|---|
| `config/` | Environment and app configuration |
| `database/` | SQLite service, migrations, base repository/datasource infrastructure |
| `storage/` | MMKV abstraction |
| `logging/` | Structured logger |
| `security/` | Secrets helpers, encryption hooks (as needed) |
| `utils/` | Core-only utilities (no UI) |

## What must never go here

- React components or screens
- Feature domain entities
- Imports from `features/` or `shared/`
- Cloud SDK usage that leaks into the UI layer (keep behind interfaces)
