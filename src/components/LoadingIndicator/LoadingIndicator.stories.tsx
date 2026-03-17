import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { LoadingIndicator } from './index';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Components/LoadingIndicator',
  component: LoadingIndicator,
  decorators: [
    Story => (
      <View className="flex-1 items-center justify-center bg-white p-6 gap-6">
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Medium: Story = {
  args: { size: 'md' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const WithMessage: Story = {
  args: {
    size: 'md',
    color: 'secondary',
    message: 'Loading...',
  },
};

export const PrimaryColor: Story = {
  args: {
    size: 'md',
    color: 'primary',
    message: 'Please wait',
  },
};

export const WhiteOnDark: Story = {
  decorators: [
    Story => (
      <View className="flex-1 items-center justify-center bg-primary p-6">
        <Story />
      </View>
    ),
  ],
  args: {
    size: 'md',
    color: 'white',
    message: 'Loading...',
  },
};

export const Overlay: Story = {
  decorators: [
    Story => (
      <View className="w-full h-40 bg-gray-bg rounded-xl overflow-hidden">
        <Story />
      </View>
    ),
  ],
  args: {
    size: 'md',
    color: 'white',
    message: 'Loading...',
    overlay: true,
  },
};
