import React, { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { RadioController } from './index';

const meta: Meta<typeof RadioController> = {
  title: 'Components/RadioController',
  component: RadioController,
  decorators: [
    Story => (
      <View className="flex-1 bg-gray-bg p-6 justify-center">
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof RadioController>;

const TOPPINGS = [
  { label: 'Guacamole', value: 'guacamole', price: '$2.99' },
  { label: 'Jalapeños', value: 'jalapenos', price: '$3.99' },
  { label: 'Sour Cream', value: 'sour-cream', price: '$1.99' },
];

const ControlledTemplate = (
  args: React.ComponentProps<typeof RadioController>,
) => {
  const [value, setValue] = useState(args.value);
  return <RadioController {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    options: TOPPINGS,
    value: 'jalapenos',
  },
};

export const NoPrice: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    options: [
      { label: 'Small', value: 'small' },
      { label: 'Medium', value: 'medium' },
      { label: 'Large', value: 'large' },
    ],
    value: 'medium',
  },
};

export const NoneSelected: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    options: TOPPINGS,
    value: '',
  },
};

export const Disabled: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    options: TOPPINGS,
    value: 'guacamole',
    disabled: true,
  },
};
