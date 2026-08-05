# core/utils/

## Why it exists

Small, framework-agnostic helpers needed by core modules.

## What belongs here

- Pure helpers used by database/storage/config/logging
- Result/error helpers shared across core

## What must never go here

- React hooks or components
- Feature-specific helpers (put those in the feature or in `shared/utils` if reused)
- Catch-all dumping ground — prefer deleting unused utils
