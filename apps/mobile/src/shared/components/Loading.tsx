import { ActivityIndicator, View, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Text } from './Text';

export type LoadingProps = {
  label?: string;
  fullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Loading({
  label = 'Loading…',
  fullScreen = false,
  style,
}: LoadingProps) {
  const { theme } = useUnistyles();
  styles.useVariants({ fullScreen });

  return (
    <View
      style={[styles.root, style]}
      accessibilityLabel={label}
      accessibilityRole="progressbar"
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      {label ? (
        <Text variant="caption" tone="muted" style={styles.label}>
          {label}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
    variants: {
      fullScreen: {
        true: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        false: {},
        default: {},
      },
    },
  },
  label: {
    textAlign: 'center',
  },
}));
