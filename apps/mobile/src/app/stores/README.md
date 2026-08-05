# app/stores/

## Why it exists

App-level Zustand client state that is not owned by a single feature (e.g. theme).

## What belongs here

- Theme preference store
- Other composition-root UI state used across features

## What must never go here

- Feature domain stores (auth → `features/authentication`, settings → `features/settings`)
- Business entity caches (accounts, transactions — use repositories)
- Server/remote state (TanStack Query)
