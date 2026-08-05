# shared/theme/

## Why it exists

Design tokens: colors (light/dark + semantic), typography, spacing, radius, elevation.

## What belongs here

- Token definitions (`tokens/`)
- Assembled light/dark themes (`themes.ts`)
- Theme type exports

## What must never go here

- Provider registration → `app/theme`
- Feature styles
- Business logic

## Visual direction

Cool slate neutrals + teal accent. Avoid purple gradients, cream/terracotta palettes, and broadsheet layouts.
