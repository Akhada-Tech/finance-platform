# shared/constants/

## Why it exists

Stable app-wide constants (India-first defaults: INR, locales, date formats).

## What belongs here

- Currency / locale defaults
- Non-secret app constants

## What must never go here

- Environment secrets → `core/config`
- Feature enums that only one feature uses
