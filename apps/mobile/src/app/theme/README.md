# app/theme/

## Why it exists

Registers themes with the styling system and connects theme preference (Zustand) to Unistyles.

## What belongs here

- Theme registration / provider bridge
- Runtime theme switching glue

## What must never go here

- Color/spacing/typography tokens → `shared/theme`
- Feature-specific styles
- Business logic
