# core/logging/

## Why it exists

One logger for the app so diagnostics stay consistent and can later fan out to remote tooling without touching call sites.

## What belongs here

- Logger interface and console (or native) implementation
- Log level helpers

## What must never go here

- PII/secrets in default log payloads
- Feature business rules
- UI components
