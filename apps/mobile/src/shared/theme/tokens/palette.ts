/**
 * Raw palette — not used directly in UI.
 * Components consume semantic colors from the active theme.
 *
 * Direction: cool slate neutrals + teal accent (India-first finance).
 * Avoids purple gradients, cream/terracotta, and broadsheet motifs.
 */
export const palette = {
  teal50: '#F0FDFA',
  teal100: '#CCFBF1',
  teal500: '#14B8A6',
  teal600: '#0D9488',
  teal700: '#0F766E',
  teal800: '#115E59',

  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate300: '#CBD5E1',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate600: '#475569',
  slate700: '#334155',
  slate800: '#1E293B',
  slate900: '#0F172A',
  slate950: '#020617',

  navy950: '#0B1220',
  navy900: '#111827',

  white: '#FFFFFF',
  black: '#000000',

  green500: '#22C55E',
  green600: '#16A34A',
  red500: '#EF4444',
  red600: '#DC2626',
  amber500: '#F59E0B',
  amber600: '#D97706',
  blue500: '#3B82F6',
  blue600: '#2563EB',
} as const;

export type Palette = typeof palette;
