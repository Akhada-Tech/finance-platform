import { Platform } from 'react-native';

/**
 * Intentional faces — not Inter/Roboto/system-ui defaults.
 * Custom font files can replace these later without changing call sites.
 */
export const fonts = {
  sans: Platform.select({
    ios: 'Avenir Next',
    android: 'sans-serif',
    default: 'System',
  }) as string,
  display: Platform.select({
    ios: 'Avenir Next',
    android: 'sans-serif-medium',
    default: 'System',
  }) as string,
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }) as string,
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  '2xl': 28,
  '3xl': 34,
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const lineHeights = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 30,
  '2xl': 36,
  '3xl': 42,
} as const;

export const typography = {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
} as const;

export type Typography = typeof typography;
