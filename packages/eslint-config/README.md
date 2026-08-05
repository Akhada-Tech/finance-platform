# @finance-platform/eslint-config

## Why it exists

Keeps lint rules consistent across apps without copying ESLint config into every package.

## What belongs here

- Shared ESLint flat-config fragments
- Rule sets used by two or more packages

## What must never go here

- App-specific one-off overrides that only one package needs
- Business logic or source code
- Formatting rules that belong in Prettier
