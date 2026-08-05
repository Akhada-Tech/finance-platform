# features/authentication/store/

## Why it exists

Owns authentication **client** state (local session today, remote auth later).

## What belongs here

- Zustand auth store
- Session flags persisted via `KeyValueStorage`

## What must never go here

- SQLite business data
- UI screens
- Direct MMKV / Supabase SDK usage in screens (keep behind this store / future Auth service)
