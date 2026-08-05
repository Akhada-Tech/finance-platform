# core/security/

## Why it exists

Holds security primitives used by auth and storage layers (Architecture §15).

## What belongs here

- Secure storage helpers
- Future biometric / keychain wrappers
- Input/output sanitization utilities that are not feature-specific

## What must never go here

- Auth UI
- Hard-coded API keys or tokens
- Feature domain logic
