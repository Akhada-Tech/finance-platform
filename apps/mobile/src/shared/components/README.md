# shared/components/

## Why it exists

Reusable UI primitives for the design system. Prefer composition over one-off styled views in features.

## What belongs here

- Button, Text, Screen, Card, Divider, Loading, EmptyState, …
- Presentational components with no feature domain imports

## What must never go here

- Screens
- Feature-specific widgets (e.g. `AccountBalanceCard` → `features/accounts/components`)
- Data fetching
