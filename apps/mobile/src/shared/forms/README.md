# shared/forms/

## Why it exists

Shared React Hook Form + Zod helpers so features don’t reinvent validation wiring.

## What belongs here

- Form field helpers
- Zod ↔ RHF resolvers / utilities
- Common validators (amount, phone, email) once reused

## What must never go here

- Feature-specific schemas that aren’t reused (`features/<name>/validation`)
- Screen layouts
