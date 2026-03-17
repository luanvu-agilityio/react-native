import { View, Text } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { TextInput } from './index';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  decorators: [
    Story => (
      <View className="flex-1 bg-white p-6 gap-4 justify-center">
        <Story />
      </View>
    ),
  ],
  argTypes: {
    onChangeText: { action: 'onChangeText' },
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'example@example.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
  },
};

export const WithLabel: Story = {
  args: {
    value: '',
    label: 'Email',
    placeholder: 'example@example.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
  },
};

export const Password: Story = {
  args: {
    value: '************',
    placeholder: 'Password',
    secureTextEntry: true,
  },
};

export const DateVariant: Story = {
  args: {
    value: '',
    placeholder: 'DD / MM / YYYY',
    variant: 'date',
    keyboardType: 'numeric',
  },
};

export const NumberOnly: Story = {
  args: {
    value: '',
    placeholder: 'Enter numbers only',
    numberOnly: true,
    keyboardType: 'numeric',
  },
};

export const Search: Story = {
  args: {
    value: '',
    placeholder: 'Search',
    rightIcon: (
      <View className="bg-secondary rounded-full w-8 h-8 items-center justify-center">
        <Text className="text-white text-sm">⊕</Text>
      </View>
    ),
  },
};

export const Textarea: Story = {
  args: {
    value: '',
    placeholder: 'Others reason...',
    multiline: true,
    numberOfLines: 5,
  },
};

export const WithError: Story = {
  args: {
    value: 'invalid-email',
    label: 'Email',
    placeholder: 'example@example.com',
    errorMessage: 'Please enter a valid email address.',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
  },
};

export const Disabled: Story = {
  args: {
    value: 'Cannot edit this',
    label: 'Read only',
    placeholder: '',
    editable: false,
  },
};

export const WithMaxLength: Story = {
  args: {
    value: '',
    label: 'Username',
    placeholder: 'Max 20 characters',
    maxLength: 20,
  },
};
