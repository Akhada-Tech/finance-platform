# app/navigation/

## Why it exists

Defines the app’s navigation graph: Root Stack → Auth Stack / Main Tabs → feature stacks.

## What belongs here

- Root, auth, and main tab navigators
- Typed route param lists for app-level routes
- Linking config (later)

## What must never go here

- Feature-internal screens’ business UI (screens live in features)
- Feature stack details that belong in `features/<name>/navigation`
- Data fetching or domain rules
