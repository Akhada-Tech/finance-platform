import { StyleSheet, Text, View } from 'react-native';

type PlaceholderScreenProps = {
  name: string;
};

/**
 * Temporary screen body used only to verify navigation wiring.
 * Replaced by real feature UI later — not a design-system primitive.
 */
export function PlaceholderScreen({ name }: PlaceholderScreenProps) {
  return (
    <View
      style={styles.container}
      testID={`screen-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Text style={styles.title}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111827',
  },
});
