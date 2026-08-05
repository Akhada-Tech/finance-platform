import { Platform, type ViewStyle } from 'react-native';

type ElevationStyle = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
>;

function createElevation(
  offsetY: number,
  radius: number,
  opacity: number,
  androidElevation: number,
): ElevationStyle {
  return Platform.select<ElevationStyle>({
    ios: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation: androidElevation,
      shadowColor: '#0F172A',
    },
    default: {
      elevation: androidElevation,
    },
  }) as ElevationStyle;
}

export const elevation = {
  none: createElevation(0, 0, 0, 0),
  sm: createElevation(1, 2, 0.08, 2),
  md: createElevation(2, 4, 0.12, 4),
  lg: createElevation(4, 8, 0.16, 8),
} as const;

export type Elevation = typeof elevation;
export type ElevationKey = keyof Elevation;
