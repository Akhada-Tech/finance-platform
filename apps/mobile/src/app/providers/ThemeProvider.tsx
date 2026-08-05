import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';

import { syncUnistylesPreference } from '../theme/syncUnistylesPreference';

export type ColorSchemePreference = 'light' | 'dark' | 'system';
export type ResolvedColorScheme = 'light' | 'dark';

type ThemeContextValue = {
  preference: ColorSchemePreference;
  resolved: ResolvedColorScheme;
  setPreference: (preference: ColorSchemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
  initialPreference?: ColorSchemePreference;
};

/**
 * Owns theme preference and keeps Unistyles runtime in sync.
 * Persistence moves to Zustand in the state-management section.
 */
export function ThemeProvider({
  children,
  initialPreference = 'system',
}: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] =
    useState<ColorSchemePreference>(initialPreference);

  const value = useMemo<ThemeContextValue>(() => {
    const resolved: ResolvedColorScheme =
      preference === 'system'
        ? systemScheme === 'dark'
          ? 'dark'
          : 'light'
        : preference;

    return {
      preference,
      resolved,
      setPreference,
    };
  }, [preference, systemScheme]);

  useEffect(() => {
    syncUnistylesPreference(preference);
  }, [preference]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useThemePreference(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useThemePreference must be used within ThemeProvider');
  }

  return value;
}
