import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Heading } from './index';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  decorators: [
    Story => (
      <View className="flex-1 justify-center bg-white p-6 gap-4">
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const H1: Story = {
  args: { level: 1, children: 'Heading 1 — 34.85px' },
};

export const H2: Story = {
  args: { level: 2, children: 'Heading 2 — 33px' },
};

export const H3: Story = {
  args: { level: 3, children: 'Heading 3 — 32px' },
};

export const H4: Story = {
  args: { level: 4, children: 'Heading 4 — 28px' },
};

export const H5: Story = {
  args: { level: 5, children: 'Heading 5 — 24px' },
};

export const H6: Story = {
  args: { level: 6, children: 'Heading 6 — 20px' },
};

export const AllLevels: Story = {
  render: () => (
    <View className="gap-3">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </View>
  ),
};

export const CustomColor: Story = {
  args: {
    level: 2,
    children: 'Custom color via className',
    className: 'text-secondary',
  },
};

export const Multiline: Story = {
  args: {
    level: 3,
    children: 'This is a heading that spans multiple lines to show wrapping',
    numberOfLines: 0,
  },
};
