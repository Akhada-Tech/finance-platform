import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

import { Button } from '../Button';
import { EmptyState } from '../EmptyState';
import { Text } from '../Text';

test('Text renders children', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<Text>Hello</Text>);
  });

  expect(renderer!.root.findByType(Text).props.children).toBe('Hello');
});

test('Button exposes accessibility role', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <Button label="Save" onPress={() => undefined} />,
    );
  });

  expect(renderer!.root.findByProps({ accessibilityRole: 'button' })).toBeTruthy();
});

test('EmptyState renders title and optional action', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(
      <EmptyState
        title="No accounts"
        description="Add your first account"
        actionLabel="Add account"
        onActionPress={() => undefined}
      />,
    );
  });

  expect(renderer!.toJSON()).toBeTruthy();
});
