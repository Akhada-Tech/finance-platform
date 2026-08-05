# app/bootstrap/

## Why it exists

Owns the ordered startup path: load config → open database → hydrate stores → show UI.

## What belongs here

- Startup orchestration functions/components
- Splash visibility control
- Fatal startup error handling entry points

## What must never go here

- Feature business logic
- Screen UI beyond a temporary splash shell
- Direct SQL queries
