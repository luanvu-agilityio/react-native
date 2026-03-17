import * as React from 'react';
import { render } from '@testing-library/react-native';
import DotIndicators from '../../DotIndicators';

const findAllWithProp = (
  node: unknown,
  prop: string,
  value: unknown,
  out: unknown[] = [],
): unknown[] => {
  if (node === null || node === undefined) return out;
  if (Array.isArray(node)) {
    for (const child of node) findAllWithProp(child, prop, value, out);
    return out;
  }
  if (typeof node === 'object') {
    const obj = node as Record<string, unknown>;
    const props = obj.props as Record<string, unknown> | undefined;
    if (props && prop in props && props[prop] === value) out.push(node);
    const children = obj.children as unknown[] | undefined;
    if (Array.isArray(children)) {
      for (const child of children) findAllWithProp(child, prop, value, out);
    }
  }
  return out;
};

describe('DotIndicators', () => {
  it('renders correct number of dots and exposes accessibility labels', () => {
    const slides = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const { toJSON } = render(
      <DotIndicators slides={slides} currentIndex={1} />,
    );

    const tree = toJSON();
    const tabs = findAllWithProp(tree, 'accessibilityRole', 'tab');
    expect(tabs.length).toBe(3);
    // second item selected
    const second = tabs[1] as { props: Record<string, unknown> };
    const accessibilityState = second.props.accessibilityState as
      | Record<string, unknown>
      | undefined;
    expect(accessibilityState && accessibilityState.selected).toBe(true);
  });
});
