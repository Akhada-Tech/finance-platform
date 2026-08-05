# shared/utils/

## Why it exists

Pure helpers used by multiple features or shared components (formatting currency, dates).

## What belongs here

- Formatters and pure functions
- Small shared algorithms with no I/O

## What must never go here

- Core infrastructure helpers → `core/utils`
- Feature-only helpers
- Side-effecting I/O
