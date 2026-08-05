import { useEffect, useState, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { bootstrapApp } from './bootstrapApp';
import { SplashScreen } from './SplashScreen';

type BootstrapStatus = 'loading' | 'ready' | 'failed';

type AppBootstrapProps = {
  children: ReactNode;
  /** Injectable for tests; defaults to production bootstrap. */
  bootstrap?: () => Promise<void>;
};

/**
 * Runs startup work once, gates the tree behind splash, and surfaces
 * fatal bootstrap failures before navigation mounts.
 */
export function AppBootstrap({
  children,
  bootstrap = bootstrapApp,
}: AppBootstrapProps) {
  const [status, setStatus] = useState<BootstrapStatus>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await bootstrap();
        if (!cancelled) {
          setStatus('ready');
        }
      } catch (error) {
        if (!cancelled) {
          setStatus('failed');
          setErrorMessage(
            error instanceof Error ? error.message : 'Failed to start the app.',
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [bootstrap]);

  if (status === 'loading') {
    return <SplashScreen />;
  }

  if (status === 'failed') {
    return (
      <View style={styles.failure} accessibilityRole="alert">
        <Text style={styles.failureTitle}>Unable to start</Text>
        <Text style={styles.failureMessage}>
          {errorMessage ?? 'An unknown startup error occurred.'}
        </Text>
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  failure: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  failureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  failureMessage: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
  },
});
