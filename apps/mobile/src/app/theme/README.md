# app/theme/

## Why it exists

Registers themes with Unistyles and syncs preference runtime APIs.

## What belongs here

- `unistyles.ts` — `StyleSheet.configure` (imported first from `index.js`)
- Breakpoints
- Preference → Unistyles sync helpers

## What must never go here

- Color/spacing/typography tokens → `shared/theme`
- Feature-specific styles
- Business logic
