import { palette } from './palette';

export type SemanticColors = {
  background: string;
  backgroundSubtle: string;
  surface: string;
  surfaceRaised: string;
  border: string;
  borderStrong: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;

  primary: string;
  primaryPressed: string;
  primaryMuted: string;
  onPrimary: string;

  danger: string;
  dangerMuted: string;
  onDanger: string;
  success: string;
  successMuted: string;
  warning: string;
  warningMuted: string;
  info: string;
  infoMuted: string;

  /** Finance semantics */
  income: string;
  expense: string;

  overlay: string;
  focusRing: string;
};

export const lightColors: SemanticColors = {
  background: palette.slate50,
  backgroundSubtle: palette.slate100,
  surface: palette.white,
  surfaceRaised: palette.white,
  border: palette.slate200,
  borderStrong: palette.slate300,

  textPrimary: palette.slate900,
  textSecondary: palette.slate600,
  textMuted: palette.slate500,
  textInverse: palette.white,

  primary: palette.teal700,
  primaryPressed: palette.teal800,
  primaryMuted: palette.teal100,
  onPrimary: palette.white,

  danger: palette.red600,
  dangerMuted: '#FEE2E2',
  onDanger: palette.white,
  success: palette.green600,
  successMuted: '#DCFCE7',
  warning: palette.amber600,
  warningMuted: '#FEF3C7',
  info: palette.blue600,
  infoMuted: '#DBEAFE',

  income: palette.green600,
  expense: palette.red600,

  overlay: 'rgba(15, 23, 42, 0.45)',
  focusRing: palette.teal500,
};

export const darkColors: SemanticColors = {
  background: palette.navy950,
  backgroundSubtle: palette.navy900,
  surface: palette.slate900,
  surfaceRaised: palette.slate800,
  border: palette.slate700,
  borderStrong: palette.slate600,

  textPrimary: palette.slate50,
  textSecondary: palette.slate300,
  textMuted: palette.slate400,
  textInverse: palette.slate950,

  primary: palette.teal500,
  primaryPressed: palette.teal600,
  primaryMuted: '#134E4A',
  onPrimary: palette.slate950,

  danger: palette.red500,
  dangerMuted: '#7F1D1D',
  onDanger: palette.white,
  success: palette.green500,
  successMuted: '#14532D',
  warning: palette.amber500,
  warningMuted: '#78350F',
  info: palette.blue500,
  infoMuted: '#1E3A8A',

  income: palette.green500,
  expense: palette.red500,

  overlay: 'rgba(2, 6, 23, 0.6)',
  focusRing: palette.teal500,
};
