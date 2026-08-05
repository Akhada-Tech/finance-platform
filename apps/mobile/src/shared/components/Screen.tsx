import type { ReactNode } from 'react';
import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { spacing } from '../theme';

export type ScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Screen shell with theme background and safe-area padding.
 */
export function Screen({
  children,
  scroll = false,
  padded = true,
  style,
  contentStyle,
  testID,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const horizontalPad = padded ? spacing.lg : 0;

  const edgeStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: Math.max(insets.left, horizontalPad),
    paddingRight: Math.max(insets.right, horizontalPad),
  };

  if (scroll) {
    return (
      <ScrollView
        testID={testID}
        style={styles.root}
        contentContainerStyle={[styles.scrollContent, edgeStyle, contentStyle]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View testID={testID} style={[styles.root, edgeStyle, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
}));
