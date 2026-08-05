# app/

## Why it exists

Composition root of the mobile app. Wires providers, navigation, theme registration, and startup — it does not own business rules.

## What belongs here

| Folder | Role |
|---|---|
| `bootstrap/` | App startup sequence (DB init, splash, error boundary mount) |
| `providers/` | React context / Query / theme provider tree |
| `navigation/` | Root navigators and route composition |
| `theme/` | Unistyles / theme provider registration (not design tokens) |

## What must never go here

- Feature screens or feature domain logic
- SQL, repositories, or MMKV access
- Design tokens (those live in `shared/theme`)
- One-off UI that belongs to a single feature
