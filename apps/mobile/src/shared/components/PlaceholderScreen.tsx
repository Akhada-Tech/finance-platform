import { StyleSheet } from 'react-native-unistyles';

import { Screen } from './Screen';
import { Text } from './Text';

type PlaceholderScreenProps = {
  name: string;
};

/**
 * Temporary screen body used only to verify navigation wiring.
 * Uses design-system primitives; not a permanent design-system export.
 */
export function PlaceholderScreen({ name }: PlaceholderScreenProps) {
  return (
    <Screen
      testID={`screen-${name.toLowerCase().replace(/\s+/g, '-')}`}
      style={styles.center}
    >
      <Text variant="title">{name}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
