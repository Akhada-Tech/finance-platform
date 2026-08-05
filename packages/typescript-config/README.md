# @finance-platform/typescript-config

## Why it exists

Centralizes TypeScript compiler options so every app and package in the monorepo shares the same strict baseline.

## What belongs here

- Shared `tsconfig` JSON bases (`base.json`, `react-native.json`)
- Future app-specific extends only when a second consumer needs them

## What must never go here

- Application source code
- Feature types or domain models
- Runtime dependencies
