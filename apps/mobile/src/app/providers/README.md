# app/providers/

## Why it exists

Single place to compose React providers so `App` stays thin and provider order is explicit.

## What belongs here

- QueryClientProvider
- Theme / Unistyles provider wiring
- Error boundary host
- Future auth session provider (when needed)

## What must never go here

- Feature-specific providers that only one screen needs
- Business logic
- Navigation route definitions
