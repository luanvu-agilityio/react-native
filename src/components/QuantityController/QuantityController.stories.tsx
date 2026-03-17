import { useState } from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

// Components
import { QuantityController } from './index';

const meta: Meta<typeof QuantityController> = {
  title: 'Components/QuantityController',
  component: QuantityController,
  decorators: [
    Story => (
      <View className="flex-1 items-center justify-center bg-white p-6 gap-6">
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof QuantityController>;

const ControlledTemplate = (
  args: React.ComponentProps<typeof QuantityController>,
) => {
  const [value, setValue] = useState(args.value ?? 1);
  return <QuantityController {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    value: 1,
    min: 0,
  },
};

export const WithMax: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    value: 3,
    min: 1,
    max: 5,
  },
};

export const AtMin: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    value: 0,
    min: 0,
  },
};

export const AtMax: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    value: 10,
    min: 0,
    max: 10,
  },
};

export const WithStep: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    value: 0,
    min: 0,
    max: 20,
    step: 5,
  },
};

export const Disabled: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    value: 2,
    disabled: true,
  },
};

export const SizeSmall: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    value: 1,
    min: 0,
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  render: args => <ControlledTemplate {...args} />,
  args: {
    value: 1,
    min: 0,
    size: 'md',
  },
};
