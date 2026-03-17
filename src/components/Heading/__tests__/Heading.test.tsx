import React from 'react';
import { Text as RNText } from 'react-native';
import ReactTestRenderer, { act } from 'react-test-renderer';

import { Heading, HeadingLevel } from '../index';

const render = (ui: React.ReactElement) => {
  let renderer!: ReactTestRenderer.ReactTestRenderer;
  act(() => {
    renderer = ReactTestRenderer.create(ui);
  });
  return renderer;
};

const getTextNode = (renderer: ReactTestRenderer.ReactTestRenderer) =>
  renderer.root.findByType(RNText);

describe('Heading', () => {
  it('renders correctly with default props (snapshot)', () => {
    const renderer = render(<Heading>Hello</Heading>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    const renderer = render(<Heading level={2}>Welcome</Heading>);
    expect(getTextNode(renderer).props.children).toBe('Welcome');
  });

  it('defaults to level 1', () => {
    const renderer = render(<Heading>Title</Heading>);
    const className: string = getTextNode(renderer).props.className;
    expect(className).toContain('text-35');
    expect(className).toContain('font-primary-extrabold');
  });

  it.each([
    [1, 'text-35', 'font-primary-extrabold'],
    [2, 'text-33', 'font-primary-extrabold'],
    [3, 'text-32', 'font-primary-bold'],
    [4, 'text-28', 'font-primary-bold'],
    [5, 'text-2xl', 'font-primary-semibold'],
    [6, 'text-xl', 'font-primary-medium'],
  ] as [HeadingLevel, string, string][])(
    'level %i applies correct size and weight classes',
    (level, sizeClass, weightClass) => {
      const renderer = render(<Heading level={level}>Text</Heading>);
      const className: string = getTextNode(renderer).props.className;
      expect(className).toContain(sizeClass);
      expect(className).toContain(weightClass);
    },
  );

  it('always applies the primary font class', () => {
    const renderer = render(<Heading level={3}>Title</Heading>);
    const className: string = getTextNode(renderer).props.className;
    expect(className).toContain('font-primary');
  });

  it('always applies accessibilityRole="header"', () => {
    const renderer = render(<Heading level={2}>Section</Heading>);
    expect(getTextNode(renderer).props.accessibilityRole).toBe('header');
  });

  it('merges custom className', () => {
    const renderer = render(
      <Heading level={1} className="text-secondary">
        Colored
      </Heading>,
    );
    const className: string = getTextNode(renderer).props.className;
    expect(className).toContain('text-secondary');
  });

  it('forwards additional RNText props (numberOfLines)', () => {
    const renderer = render(
      <Heading level={1} numberOfLines={1}>
        Truncated
      </Heading>,
    );
    expect(getTextNode(renderer).props.numberOfLines).toBe(1);
  });

  it('forwards testID', () => {
    const renderer = render(
      <Heading level={1} testID="heading-title">
        Title
      </Heading>,
    );
    expect(getTextNode(renderer).props.testID).toBe('heading-title');
  });
});
