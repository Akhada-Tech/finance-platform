# src/

## Why it exists

Application source for `@finance-platform/mobile`. Everything the app ships lives under here.

## Layout

| Folder | Responsibility |
|---|---|
| `app/` | Bootstrap, providers, navigation, app-level theme wiring |
| `core/` | Platform infrastructure (DB, storage, config, logging, security) |
| `shared/` | Reusable UI and helpers used by two or more features |
| `features/` | Feature modules that own screens, domain, and data |

## Dependency rules

```text
features → shared → core
features → core
app → features | shared | core
```

- `core` must never import from `features` or `shared`
- `shared` must never import from `features`
- Features must not import other features except through a deliberate public API

## What must never go here

- Native project files (`android/`, `ios/`)
- Monorepo packages (`packages/`)
- Secrets or environment files with real credentials
