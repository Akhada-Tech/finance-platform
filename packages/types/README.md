# @finance-platform/types

## Why it exists

Holds TypeScript contracts that are shared by two or more apps (mobile, future backend/website).

## What belongs here

- Stable, app-agnostic type contracts
- API request/response shapes once a backend exists

## What must never go here

- Mobile-only UI types
- Feature domain entities that only live in `apps/mobile`
- Runtime logic
