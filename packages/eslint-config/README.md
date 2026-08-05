# @finance-platform/eslint-config

## Why it exists

Keeps lint rules consistent across apps without copying ESLint config into every package.

## What belongs here

- Shared ESLint config fragments (`base`, `react-native`)
- Rule sets used by two or more packages

## Usage

```js
// apps/mobile/.eslintrc.js
module.exports = {
  root: true,
  extends: ['@finance-platform/eslint-config/react-native'],
};
```

The mobile app must also depend on `@react-native/eslint-config` (already included in the RN template).

## What must never go here

- App-specific one-off overrides that only one package needs
- Business logic or source code
- Formatting rules that belong in Prettier
