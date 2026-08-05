import { StyleSheet } from 'react-native-unistyles';

import { themes } from '../../shared/theme';
import { breakpoints } from './breakpoints';

type AppThemes = typeof themes;
type AppBreakpoints = typeof breakpoints;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

/**
 * Must run before any StyleSheet.create from react-native-unistyles.
 * Imported from index.js as the first module side-effect.
 */
StyleSheet.configure({
  themes,
  breakpoints,
  settings: {
    adaptiveThemes: true,
  },
});
