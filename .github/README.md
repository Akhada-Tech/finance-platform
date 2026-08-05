# GitHub Actions / CI

## Why it exists

Enforces Architecture §16–17: every push/PR must pass install, lint, typecheck, and tests before merge.

## Workflow

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

| Step      | Command                          |
| --------- | -------------------------------- |
| Install   | `pnpm install --frozen-lockfile` |
| Lint      | `pnpm lint`                      |
| Typecheck | `pnpm typecheck`                 |
| Test      | `pnpm test`                      |

Triggers: `push` to `main` / `release`, and all `pull_request`s.

## What belongs here

- Quality gates that block merges
- Future: coverage upload, Detox (later), deploy (later)

## What must never go here

- Secrets in workflow logs
- Production deploy keys without review
- Native iOS/Android release builds until the release pipeline is designed
