# Finance Platform

Offline-first personal finance platform for Indian users.

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). It is the source of truth for engineering decisions.

Related docs:

- [`docs/RUNNING.md`](docs/RUNNING.md) — iOS / Android run steps
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — Unistyles tokens & primitives
- [`.github/README.md`](.github/README.md) — CI quality gates

## Prerequisites

- Node.js 22+ (see `.nvmrc`)
- pnpm 10.x (`corepack enable` recommended)
- Xcode + CocoaPods (iOS)
- Android Studio / SDK (Android)

## Setup

```bash
pnpm install
```

iOS pods (first time, and after native dependency changes):

```bash
cd apps/mobile/ios
bundle install
bundle exec pod install
cd ../../..
```

## Running the app

```bash
pnpm install
pnpm ios      # or: pnpm android
```

Full simulator/emulator notes: [`docs/RUNNING.md`](docs/RUNNING.md).

## Monorepo layout

```text
apps/mobile                 React Native CLI app (TypeScript)
packages/eslint-config
packages/typescript-config
packages/types
docs/
.github/workflows/ci.yml    install → lint → typecheck → test
```

## Scripts

| Command                                        | Description                   |
| ---------------------------------------------- | ----------------------------- |
| `pnpm --filter @finance-platform/mobile start` | Metro bundler                 |
| `pnpm android`                                 | Run Android app               |
| `pnpm ios`                                     | Run iOS app                   |
| `pnpm lint`                                    | Lint all packages             |
| `pnpm typecheck`                               | TypeScript check all packages |
| `pnpm test`                                    | Run tests                     |
| `pnpm format` / `pnpm format:check`            | Prettier                      |

### DX tooling

- Path alias: `@/*` → `apps/mobile/src/*` (TypeScript + Babel + Jest)
- Husky: pre-commit → lint-staged; commit-msg → Commitlint (conventional commits)
- Shared ESLint: `@finance-platform/eslint-config/react-native`
- GUI Git (Cursor/VS Code): Husky loads `~/.config/husky/init.sh` so nvm/Node are on `PATH`
- CI: GitHub Actions on `main` / `release` and pull requests

## Foundation status

Engineering foundation is complete for offline V1 scaffolding:

1. Monorepo (Turborepo + pnpm) + React Native 0.86
2. `src/` feature-first structure
3. App layer (providers, bootstrap, error boundary)
4. Navigation (Root → Auth / Main Tabs → feature stacks)
5. Design system (Unistyles + primitives)
6. Core data (MMKV, Nitro SQLite, migrations runner — no business tables)
7. Zustand stores (theme, settings, auth)
8. Forms (RHF + Zod helpers)
9. Linting / Husky / Commitlint / `@/` aliases
10. GitHub Actions CI

Business features (accounts, transactions, budgets, …) are intentionally not implemented yet.
