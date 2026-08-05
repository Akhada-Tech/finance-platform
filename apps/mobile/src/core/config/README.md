# core/config/

## Why it exists

Typed access to environment and build-time configuration. No secrets in source (Architecture §15).

## What belongs here

- Environment loaders (`.env` via a safe mechanism later)
- Feature flags / app constants that are configuration, not domain

## What must never go here

- Runtime business rules
- UI theme tokens
- Committed production secrets
