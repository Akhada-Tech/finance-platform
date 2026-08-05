/**
 * @format
 */

import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import { SplashScreen } from '../src/app/bootstrap/SplashScreen';
import { getAuthStatus } from '../src/features/authentication/domain/authSession';
import { PlaceholderScreen } from '../src/shared/components/PlaceholderScreen';

test('splash screen renders brand name', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<SplashScreen />);
  });

  const labels = renderer!.root
    .findAllByType(Text)
    .map(node => node.props.children);

  expect(labels).toContain('Finance Platform');
});

test('auth session stub is authenticated for offline V1', () => {
  expect(getAuthStatus()).toBe('authenticated');
});

test('placeholder screen shows its name', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<PlaceholderScreen name="Dashboard" />);
  });

  expect(renderer!.root.findByProps({ testID: 'screen-dashboard' })).toBeTruthy();
  expect(
    renderer!.root.findAllByType(Text).map(node => node.props.children),
  ).toContain('Dashboard');
});
