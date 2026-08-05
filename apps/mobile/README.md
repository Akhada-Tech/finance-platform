# @finance-platform/mobile

React Native CLI application for the finance platform.

## Why it exists

Primary client. Offline-first. Owns UI, local data, and feature modules.

## Source layout

See [`src/README.md`](src/README.md).

```text
src/
├── app/         bootstrap, providers, navigation, theme wiring
├── core/        database, storage, logging, security, config
├── shared/      design system, hooks, forms helpers, icons, charts
└── features/    feature modules (scaffolded, empty)
```

## What belongs here

- App bootstrap, navigation, providers
- Feature modules under `src/features/`
- Core infrastructure under `src/core/`
- Shared UI under `src/shared/`

## What must never go here

- Backend services
- Cross-app packages (use `packages/`)
- Cloud-only assumptions that break offline mode

## Run

Full guide (prerequisites, pods, simulators, troubleshooting): [`docs/RUNNING.md`](../../docs/RUNNING.md).

From the monorepo root:

```bash
pnpm --filter @finance-platform/mobile start
pnpm android
pnpm ios
```
