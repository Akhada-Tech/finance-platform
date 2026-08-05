import { UnistylesRuntime } from 'react-native-unistyles';

import type { ColorSchemePreference } from '../stores/themeStore';

/**
 * Bridges app preference state to Unistyles runtime.
 * System → adaptive themes; light/dark → forced theme.
 */
export function syncUnistylesPreference(
  preference: ColorSchemePreference,
): void {
  if (preference === 'system') {
    UnistylesRuntime.setAdaptiveThemes(true);
    return;
  }

  UnistylesRuntime.setAdaptiveThemes(false);
  UnistylesRuntime.setTheme(preference);
}

