import type { ReactNode } from 'react';
import {
  SafeAreaProvider,
  type Metrics,
} from 'react-native-safe-area-context';

import { ErrorBoundary } from './ErrorBoundary';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

/** Stable metrics so provider children render synchronously in tests and on first paint. */
const DEFAULT_SAFE_AREA_METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

type AppProvidersProps = {
  children: ReactNode;
  safeAreaMetrics?: Metrics;
};

/**
 * Composition root for React providers.
 * Order matters: SafeArea → ErrorBoundary → Theme → Query → tree.
 * Zustand does not need a provider; stores are imported where used.
 */
export function AppProviders({
  children,
  safeAreaMetrics = DEFAULT_SAFE_AREA_METRICS,
}: AppProvidersProps) {
  return (
    <SafeAreaProvider initialMetrics={safeAreaMetrics}>
      <ErrorBoundary>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
