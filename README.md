# Finance Platform

Offline-first personal finance platform for Indian users.

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). It is the source of truth for engineering decisions.

## Running the app

See [`docs/RUNNING.md`](docs/RUNNING.md) for iOS Simulator and Android Emulator setup and run steps.

Quick start (after prerequisites):

```bash
pnpm install
pnpm ios      # or: pnpm android
```

## Monorepo layout

```text
apps/mobile          React Native CLI app (TypeScript)
packages/eslint-config
packages/typescript-config
packages/types
docs/
```

## Scripts

| Command | Description |
|---|---|
| `pnpm --filter @finance-platform/mobile start` | Metro bundler |
| `pnpm android` | Run Android app |
| `pnpm ios` | Run iOS app |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | TypeScript check all packages |
| `pnpm test` | Run tests |

## Status

- Section 1: monorepo + React Native scaffold
- Section 2: `apps/mobile/src` folder structure + architectural READMEs
- Section 3: app layer (providers, bootstrap, splash, error boundary)
- Section 4: navigation graph with placeholder screens
- Section 5: design system (Unistyles tokens + primitives)
- Section 6: core + MMKV + SQLite foundation (no business tables)
- Section 7: Zustand client stores (theme, settings, auth)
- Section 8: forms (React Hook Form + Zod helpers)
- Next: linting/tooling (ESLint, Prettier, Husky, path aliases) + GitHub Actions

