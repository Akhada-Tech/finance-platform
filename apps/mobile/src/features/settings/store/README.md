# features/settings/store/

## Why it exists

Owns settings / UI preference client state.

## What belongs here

- Zustand settings store (onboarding flags, future UI prefs)

## What must never go here

- Theme tokens (those live in `shared/theme`)
- Business entities
- Direct MMKV imports
