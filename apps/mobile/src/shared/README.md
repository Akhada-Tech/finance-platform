# shared/

## Why it exists

Cross-feature building blocks that stay free of feature domain knowledge. Extract here only when used by two or more features (Architecture Rule 3) — scaffolding includes the folders now so imports stay stable later.

## What belongs here

| Folder | Role |
|---|---|
| `components/` | Design-system primitives (Button, Text, Screen, …) |
| `hooks/` | Generic React hooks |
| `theme/` | Design tokens (color, spacing, typography, elevation) |
| `icons/` | Lucide wrappers / icon map |
| `charts/` | Victory Native XL chart wrappers |
| `constants/` | App-wide constants (currencies, locales) |
| `forms/` | React Hook Form + Zod helpers |
| `types/` | Shared non-domain TypeScript types |
| `utils/` | Pure UI-adjacent helpers reused across features |

## What must never go here

- Feature screens or feature domain entities
- SQLite / repository implementations
- Imports from `features/*`
