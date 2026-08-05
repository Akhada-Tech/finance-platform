# shared/hooks/

## Why it exists

Generic hooks reused across features (e.g. theme preference, app state).

## What belongs here

- Hooks with no feature domain dependency
- Thin wrappers around core services when React lifecycle is required

## What must never go here

- Feature orchestration hooks (`useAccounts` → feature)
- Direct SQL
