import { elevation } from './tokens/elevation';
import { radius } from './tokens/radius';
import { darkColors, lightColors, type SemanticColors } from './tokens/semantic';
import { spacing } from './tokens/spacing';
import { typography } from './tokens/typography';

export type AppTheme = {
  colors: SemanticColors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  elevation: typeof elevation;
};

const shared = {
  spacing,
  radius,
  typography,
  elevation,
} as const;

export const lightTheme: AppTheme = {
  colors: lightColors,
  ...shared,
};

export const darkTheme: AppTheme = {
  colors: darkColors,
  ...shared,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof themes;
