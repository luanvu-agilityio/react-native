jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 10, bottom: 20, left: 0, right: 0 }),
}));

jest.mock('@components/BottomNavigationItem/BottomNav', () => {
  return () => null;
});

import * as React from 'react';
import { render } from '@testing-library/react-native';
import ScreenLayout from '../index';

const findNodeWithProp = (
  node: unknown,
  prop: string,
  value: unknown,
): unknown | null => {
  if (node === null || node === undefined) return null;

  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findNodeWithProp(child, prop, value);
      if (found) return found;
    }
    return null;
  }

  if (typeof node === 'object') {
    const obj = node as Record<string, unknown>;
    const props = obj.props as Record<string, unknown> | undefined;
    if (props && prop in props && props[prop] === value) return node;

    const children = obj.children as unknown[] | undefined;
    if (Array.isArray(children)) {
      for (const child of children) {
        const found = findNodeWithProp(child, prop, value);
        if (found) return found;
      }
    }
  }

  return null;
};

describe('ScreenLayout', () => {
  it('renders children and StatusBar with provided props', () => {
    const { toJSON } = render(
      <ScreenLayout statusBarStyle="light-content" statusBarBg="#123456">
        {'child'}
      </ScreenLayout>,
    );

    expect(JSON.stringify(toJSON())).toContain('child');
  });

  it('renders extendBackgroundToNav absolute view when true', () => {
    const { toJSON } = render(
      <ScreenLayout
        extendBackgroundToNav
        extendBackgroundColor="#abc"
        children={undefined}
      />,
    );
    const tree = toJSON();
    const node = findNodeWithProp(tree, 'pointerEvents', 'none');
    expect(node).toBeTruthy();
  });
});
