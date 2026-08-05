import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<PressableProps, 'children'> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  styles.useVariants({ variant, size, disabled: Boolean(isDisabled) });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={state => [
        styles.root,
        state.pressed && !isDisabled ? styles.pressed : null,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            color={
              variant === 'secondary' || variant === 'ghost'
                ? undefined
                : '#FFFFFF'
            }
          />
        ) : (
          <Text
            variant="label"
            tone={
              variant === 'secondary' || variant === 'ghost' ? 'primary' : 'inverse'
            }
            style={styles.label}
          >
            {label}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    variants: {
      variant: {
        primary: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.borderStrong,
        },
        ghost: {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        },
        danger: {
          backgroundColor: theme.colors.danger,
          borderColor: theme.colors.danger,
        },
        default: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
      },
      size: {
        sm: {
          minHeight: 36,
          paddingHorizontal: theme.spacing.md,
        },
        md: {
          minHeight: 44,
          paddingHorizontal: theme.spacing.lg,
        },
        lg: {
          minHeight: 52,
          paddingHorizontal: theme.spacing.xl,
        },
        default: {
          minHeight: 44,
          paddingHorizontal: theme.spacing.lg,
        },
      },
      disabled: {
        true: {
          opacity: 0.5,
        },
        false: {
          opacity: 1,
        },
      },
    },
  },
  pressed: {
    opacity: 0.88,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  label: {
    fontWeight: theme.typography.fontWeights.semibold,
  },
}));
