import { useEffect, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { useThemeStore, type ColorSchemePreference } from '@/app/stores/themeStore';
import { syncUnistylesPreference } from '@/app/theme/syncUnistylesPreference';

export type { ColorSchemePreference };
export type ResolvedColorScheme = 'light' | 'dark';

type ThemeContextValue = {
  preference: ColorSchemePreference;
  resolved: ResolvedColorScheme;
  setPreference: (preference: ColorSchemePreference) => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * Syncs Zustand theme preference to Unistyles.
 * Zustand needs no React provider — this only bridges runtime styling.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const preference = useThemeStore(state => state.preference);

  useEffect(() => {
    syncUnistylesPreference(preference);
  }, [preference]);

  return children;
}

export function useThemePreference(): ThemeContextValue {
  const preference = useThemeStore(state => state.preference);
  const setPreference = useThemeStore(state => state.setPreference);
  const systemScheme = useColorScheme();

  const resolved: ResolvedColorScheme =
    preference === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : preference;

  return {
    preference,
    resolved,
    setPreference,
  };
}
