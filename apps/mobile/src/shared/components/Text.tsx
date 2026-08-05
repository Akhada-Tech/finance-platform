import {
  Text as RNText,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type TextVariant =
  | 'display'
  | 'title'
  | 'headline'
  | 'body'
  | 'label'
  | 'caption';

export type TextTone =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'danger'
  | 'success'
  | 'income'
  | 'expense';

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  tone?: TextTone;
  align?: TextStyle['textAlign'];
};

export function Text({
  variant = 'body',
  tone = 'primary',
  align,
  style,
  ...rest
}: TextProps) {
  styles.useVariants({ variant, tone });

  return <RNText style={[styles.root, align ? { textAlign: align } : null, style]} {...rest} />;
}

const styles = StyleSheet.create(theme => ({
  root: {
    variants: {
      variant: {
        display: {
          fontFamily: theme.typography.fonts.display,
          fontSize: theme.typography.fontSizes['3xl'],
          lineHeight: theme.typography.lineHeights['3xl'],
          fontWeight: theme.typography.fontWeights.bold,
        },
        title: {
          fontFamily: theme.typography.fonts.display,
          fontSize: theme.typography.fontSizes['2xl'],
          lineHeight: theme.typography.lineHeights['2xl'],
          fontWeight: theme.typography.fontWeights.bold,
        },
        headline: {
          fontFamily: theme.typography.fonts.sans,
          fontSize: theme.typography.fontSizes.xl,
          lineHeight: theme.typography.lineHeights.xl,
          fontWeight: theme.typography.fontWeights.semibold,
        },
        body: {
          fontFamily: theme.typography.fonts.sans,
          fontSize: theme.typography.fontSizes.md,
          lineHeight: theme.typography.lineHeights.md,
          fontWeight: theme.typography.fontWeights.regular,
        },
        label: {
          fontFamily: theme.typography.fonts.sans,
          fontSize: theme.typography.fontSizes.sm,
          lineHeight: theme.typography.lineHeights.sm,
          fontWeight: theme.typography.fontWeights.medium,
        },
        caption: {
          fontFamily: theme.typography.fonts.sans,
          fontSize: theme.typography.fontSizes.xs,
          lineHeight: theme.typography.lineHeights.xs,
          fontWeight: theme.typography.fontWeights.regular,
        },
        default: {
          fontFamily: theme.typography.fonts.sans,
          fontSize: theme.typography.fontSizes.md,
          lineHeight: theme.typography.lineHeights.md,
          fontWeight: theme.typography.fontWeights.regular,
        },
      },
      tone: {
        primary: { color: theme.colors.textPrimary },
        secondary: { color: theme.colors.textSecondary },
        muted: { color: theme.colors.textMuted },
        inverse: { color: theme.colors.textInverse },
        danger: { color: theme.colors.danger },
        success: { color: theme.colors.success },
        income: { color: theme.colors.income },
        expense: { color: theme.colors.expense },
        default: { color: theme.colors.textPrimary },
      },
    },
  },
}));
