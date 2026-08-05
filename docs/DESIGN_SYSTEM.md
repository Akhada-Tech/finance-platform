# Design System

How theming and UI primitives work in `@finance-platform/mobile`.

Stack: **react-native-unistyles** v3. Visual direction: cool slate neutrals + teal accent (India-first finance). Avoid purple gradients, cream/terracotta palettes, and broadsheet layouts.

## Architecture

Tokens and themes live separately from runtime registration:

```text
apps/mobile/src/
├── shared/theme/          # Design tokens + light/dark theme objects
│   ├── tokens/            # palette, semantic, spacing, radius, typography, elevation
│   ├── themes.ts          # Assembles AppTheme
│   └── index.ts           # Public barrel
├── app/theme/             # Unistyles configure + preference sync
│   ├── unistyles.ts       # StyleSheet.configure (imported first from index.js)
│   ├── breakpoints.ts
│   └── syncUnistylesPreference.ts
├── app/providers/
│   └── ThemeProvider.tsx  # Preference state → Unistyles runtime
└── shared/components/     # Design-system primitives (Text, Button, Card, …)
```

| Layer | Owns | Does not own |
|---|---|---|
| `shared/theme` | Colors, spacing, type, radius, elevation, theme objects | Unistyles registration, feature styles |
| `app/theme` | Configure Unistyles, breakpoints, preference sync | Token definitions |
| `shared/components` | Reusable presentational primitives | Feature widgets, data fetching |
| Features | Screen layouts and feature-specific styles | Raw palette colors, duplicate primitives |

> Rule: UI uses **semantic** tokens (`theme.colors.primary`), never raw `palette.*`.

## Bootstrap order

Unistyles must be configured before any themed `StyleSheet.create`:

1. `apps/mobile/index.js` imports `./src/app/theme/unistyles` as a side effect first.
2. Babel plugin `react-native-unistyles/plugin` runs with `root: 'src'` (files outside `src/`, like `App.tsx`, stay thin and unstyled by the plugin).
3. `AppProviders` mounts `ThemeProvider`, which syncs preference into Unistyles.

If you add a new entry point or test harness, load Unistyles configure (and in Jest, `react-native-unistyles/mocks` then `unistyles.ts`) before importing components that create stylesheets.

## Tokens

Import from `@`-relative paths under `shared/theme`, or via the theme object inside Unistyles stylesheets (`theme.spacing`, `theme.colors`, …).

### Palette vs semantic colors

`tokens/palette.ts` is the raw scale (teal, slate, navy, status greens/reds/ambers/blues). **Do not use palette values in components.**

`tokens/semantic.ts` maps roles for light and dark:

| Group | Keys |
|---|---|
| Surfaces | `background`, `backgroundSubtle`, `surface`, `surfaceRaised`, `border`, `borderStrong` |
| Text | `textPrimary`, `textSecondary`, `textMuted`, `textInverse` |
| Brand | `primary`, `primaryPressed`, `primaryMuted`, `onPrimary` |
| Status | `danger` / `dangerMuted` / `onDanger`, `success` / `successMuted`, `warning` / `warningMuted`, `info` / `infoMuted` |
| Finance | `income`, `expense` |
| Misc | `overlay`, `focusRing` |

Light defaults: slate page background, white surfaces, **teal700** primary, green income / red expense.  
Dark defaults: navy background, slate surfaces, **teal500** primary.

### Spacing (4px base)

| Key | Value |
|---|---|
| `none` | 0 |
| `xxs` | 2 |
| `xs` | 4 |
| `sm` | 8 |
| `md` | 12 |
| `lg` | 16 |
| `xl` | 24 |
| `2xl` | 32 |
| `3xl` | 40 |
| `4xl` | 48 |
| `5xl` | 64 |

### Radius

| Key | Value |
|---|---|
| `none` | 0 |
| `sm` | 4 |
| `md` | 8 |
| `lg` | 12 |
| `xl` | 16 |
| `2xl` | 24 |
| `full` | 9999 |

### Typography

Platform-selected faces (swap custom fonts later without changing call sites):

| Role | iOS | Android |
|---|---|---|
| `fonts.sans` | Avenir Next | sans-serif |
| `fonts.display` | Avenir Next | sans-serif-medium |
| `fonts.mono` | Menlo | monospace |

Sizes / line heights: `xs` 12/16 → `3xl` 34/42.  
Weights: `regular` 400, `medium` 500, `semibold` 600, `bold` 700.

Prefer the `Text` component variants over hand-rolling font styles.

### Elevation

`none` | `sm` | `md` | `lg` — platform-aware (iOS shadow props / Android `elevation`). Spread into styles:

```ts
...theme.elevation.md
```

### Breakpoints

Defined in `app/theme/breakpoints.ts` and registered with Unistyles: `xs` 0, `sm` 390, `md` 768, `lg` 1024, `xl` 1280. Available for responsive styles when needed; most screens are phone-first today.

### Assembled theme

```ts
type AppTheme = {
  colors: SemanticColors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  elevation: typeof elevation;
};

themes = { light: lightTheme, dark: darkTheme };
```

Only `colors` changes between light and dark; spacing, radius, typography, and elevation are shared.

## Theme preference

`ThemeProvider` owns preference and keeps Unistyles in sync:

| Preference | Behavior |
|---|---|
| `system` (default) | Follows device appearance (`adaptiveThemes`) |
| `light` / `dark` | Forces that theme |

```tsx
import { useThemePreference } from '../app/providers/ThemeProvider';

const { preference, resolved, setPreference } = useThemePreference();
setPreference('dark');
```

- `preference` — what the user chose (`light` | `dark` | `system`)
- `resolved` — effective scheme (`light` | `dark`), used e.g. for StatusBar
- Preference is **in-memory only** today (resets to `system` on restart). Persistence is planned via Zustand + MMKV.

`AppProviders` order: SafeArea → ErrorBoundary → **ThemeProvider** → QueryProvider.

## How to style UI

### Prefer shared components

```tsx
import { Screen } from '../../shared/components/Screen';
import { Text } from '../../shared/components/Text';
import { Card } from '../../shared/components/Card';
import { Button } from '../../shared/components/Button';

export function ExampleScreen() {
  return (
    <Screen padded>
      <Text variant="title">Accounts</Text>
      <Card elevated>
        <Text tone="income">+₹1,200</Text>
      </Card>
      <Button label="Add account" onPress={() => {}} />
    </Screen>
  );
}
```

Import primitives by file path (no barrel yet). Feature-specific widgets stay under `features/<name>/components`.

### Theme-aware stylesheets

Always import `StyleSheet` from **`react-native-unistyles`**, not `react-native`:

```tsx
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create(theme => ({
  row: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    gap: theme.spacing.sm,
    ...theme.elevation.sm,
  },
}));
```

Styles recompute when the active theme changes.

### Variants

Use Unistyles variants + `styles.useVariants(...)` during render (see `Text`, `Button`, `Card`):

```tsx
styles.useVariants({ variant, size });
```

Always include a `default` branch for each variant group.

### Reading theme outside styles

When a prop needs a color (e.g. `ActivityIndicator`):

```tsx
import { useUnistyles } from 'react-native-unistyles';

const { theme } = useUnistyles();
// theme.colors.primary
```

Static, mode-invariant tokens (e.g. spacing math) may be imported from `shared/theme` directly. Prefer `theme.*` inside stylesheets for anything that should track theme.

## Primitives

| Component | Role | Main API |
|---|---|---|
| `Screen` | Safe-area shell + background | `scroll?`, `padded?` (default true) |
| `Text` | Typography + tone | `variant`: display / title / headline / body / label / caption; `tone`: primary / secondary / muted / inverse / danger / success / income / expense |
| `Button` | Actions | `label`, `variant`: primary / secondary / ghost / danger; `size`: sm / md / lg; `loading?` |
| `Card` | Content surface | `elevated?` |
| `Divider` | Hairline separator | — |
| `Loading` | Full-area spinner + optional message | — |
| `EmptyState` | Title, description, optional CTA | — |
| `PlaceholderScreen` | Temporary feature stub | title / description |

Compose these first. Add a shared primitive only when the same pattern appears in two or more features.

## Extending the system

### New semantic color

1. Add the key to `SemanticColors` and both `lightColors` / `darkColors` in `tokens/semantic.ts`.
2. Use `theme.colors.<key>` in stylesheets or map it through a `Text`/`Button` tone if it is user-facing copy/chrome.
3. Do not introduce one-off hex in feature code.

### New spacing / radius step

Add to `tokens/spacing.ts` or `tokens/radius.ts`. Keep the 4px spacing rhythm.

### New shared component

1. Place under `shared/components/`.
2. Style with Unistyles + semantic tokens.
3. Keep it presentational (no feature domain imports, no data fetching).
4. Document the public props in a short file-level comment if the API is non-obvious.

### Feature-only styles

Keep styles next to the feature screen/component. Still use Unistyles + `theme.*`. Do not copy token tables into the feature.

## Do / don’t

| Do | Don’t |
|---|---|
| Use `theme.colors.*` and shared primitives | Import `palette` in UI |
| Import `StyleSheet` from `react-native-unistyles` | Use RN `StyleSheet` for themed UI |
| Put tokens in `shared/theme` | Register Unistyles or put feature styles in `shared/theme` |
| Put preference wiring in `app/theme` / `ThemeProvider` | Duplicate theme sync in screens |
| Use `income` / `expense` tones for money | Hardcode green/red for amounts |
| Spread `theme.elevation.*` | Invent ad-hoc shadow objects |

Temporary exception: splash, error boundary, and bootstrap failure UIs still use RN `StyleSheet` with hardcoded colors. Migrate those when touching that code.

## Related

- Folder READMEs: [`shared/theme`](../apps/mobile/src/shared/theme/README.md), [`app/theme`](../apps/mobile/src/app/theme/README.md), [`shared/components`](../apps/mobile/src/shared/components/README.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md) — monorepo layering (`app/theme` vs `shared/theme`)
- [RUNNING.md](./RUNNING.md) — run the app to verify light/dark appearance
