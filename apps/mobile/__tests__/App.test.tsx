/**
 * @format
 */

import React from 'react';
import { Text as RNText } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ReactTestRenderer from 'react-test-renderer';
import { SplashScreen } from '../src/app/bootstrap/SplashScreen';
import { getAuthStatus } from '../src/features/authentication/domain/authSession';
import { PlaceholderScreen } from '../src/shared/components/PlaceholderScreen';

const safeAreaMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

test('splash screen renders brand name', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<SplashScreen />);
  });

  const labels = renderer!.root
    .findAllByType(RNText)
    .map(node => node.props.children);

  expect(labels).toContain('Finance Platform');
});

test('auth store defaults to authenticated for offline V1', () => {
  expect(getAuthStatus()).toBe('authenticated');
});

test('placeholder screen shows its name', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <PlaceholderScreen name="Dashboard" />
      </SafeAreaProvider>,
    );
  });

  expect(renderer!.root.findByProps({ testID: 'screen-dashboard' })).toBeTruthy();
});
