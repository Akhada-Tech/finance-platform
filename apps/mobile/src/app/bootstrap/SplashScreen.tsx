import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type SplashScreenProps = {
  message?: string;
};

/**
 * Minimal splash shown while bootstrapApp() runs.
 * Visual design will follow the design system later.
 */
export function SplashScreen({
  message = 'Starting Finance Platform…',
}: SplashScreenProps) {
  return (
    <View style={styles.container} accessibilityLabel="App splash screen">
      <Text style={styles.brand}>Finance Platform</Text>
      <ActivityIndicator size="large" color="#111827" style={styles.spinner} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  brand: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  spinner: {
    marginBottom: 16,
  },
  message: {
    fontSize: 14,
    color: '#6B7280',
  },
});
