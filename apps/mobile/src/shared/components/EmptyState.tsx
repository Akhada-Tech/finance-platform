import { View, type StyleProp, type ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Button } from './Button';
import { Text } from './Text';

export type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onActionPress,
  style,
  testID,
}: EmptyStateProps) {
  return (
    <View style={[styles.root, style]} testID={testID} accessibilityRole="summary">
      <Text variant="headline" align="center">
        {title}
      </Text>
      {description ? (
        <Text variant="body" tone="secondary" align="center" style={styles.description}>
          {description}
        </Text>
      ) : null}
      {actionLabel && onActionPress ? (
        <Button
          label={actionLabel}
          onPress={onActionPress}
          variant="secondary"
          style={styles.action}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing['3xl'],
    gap: theme.spacing.sm,
  },
  description: {
    marginTop: theme.spacing.xs,
  },
  action: {
    marginTop: theme.spacing.lg,
  },
}));
