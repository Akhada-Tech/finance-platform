# core/storage/

## Why it exists

MMKV holds preferences and secrets — not business entities. Screens must never import MMKV directly.

## What belongs here

- Storage interface + MMKV implementation
- Key constants for preferences / session flags

## What must never go here

- Account/transaction/business payloads (those go in SQLite)
- UI code
- Unvalidated secrets committed to source
