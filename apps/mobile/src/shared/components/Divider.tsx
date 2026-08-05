import { View, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
};

export function Divider({ orientation = 'horizontal', style }: DividerProps) {
  styles.useVariants({ orientation });

  return (
    <View
      accessibilityRole="none"
      importantForAccessibility="no"
      style={[styles.root, style]}
    />
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.border,
    variants: {
      orientation: {
        horizontal: {
          height: StyleSheet.hairlineWidth,
          width: '100%',
          alignSelf: 'stretch',
        },
        vertical: {
          width: StyleSheet.hairlineWidth,
          alignSelf: 'stretch',
        },
        default: {
          height: StyleSheet.hairlineWidth,
          width: '100%',
        },
      },
    },
  },
}));
