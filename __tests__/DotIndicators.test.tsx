import React from 'react';
import { render } from '@testing-library/react-native';
import DotIndicators from '../src/components/features/DotIndicators';

type Slide = { id: string };

test('DotIndicators renders correct number of dots and selected state', () => {
  const slides: Slide[] = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  const tree = render(
    <DotIndicators slides={slides} currentIndex={1} />,
  ).toJSON();

  function findByA11yLabel(node: any, label: string): any | null {
    if (!node) return null;
    if (node.props && node.props.accessibilityLabel === label) return node;
    if (!node.children) return null;
    for (const child of node.children) {
      const found = findByA11yLabel(child, label);
      if (found) return found;
    }
    return null;
  }

  const dot1 = findByA11yLabel(tree, 'Slide 1');
  const dot2 = findByA11yLabel(tree, 'Slide 2');
  const dot3 = findByA11yLabel(tree, 'Slide 3');

  expect(dot1).not.toBeNull();
  expect(dot2).not.toBeNull();
  expect(dot3).not.toBeNull();

  expect(dot1.props.accessibilityState.selected).toBe(false);
  expect(dot2.props.accessibilityState.selected).toBe(true);
  expect(dot3.props.accessibilityState.selected).toBe(false);
});
