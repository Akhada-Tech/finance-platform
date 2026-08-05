import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type CardProps = {
  children: ReactNode;
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Card({ children, elevated = false, style, testID }: CardProps) {
  styles.useVariants({ elevated });

  return (
    <View testID={testID} style={[styles.root, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    variants: {
      elevated: {
        true: {
          ...theme.elevation.md,
          borderColor: theme.colors.border,
        },
        false: {
          ...theme.elevation.none,
        },
        default: {
          ...theme.elevation.none,
        },
      },
    },
  },
}));
