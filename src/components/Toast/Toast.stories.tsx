import React from 'react';
import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';

import { Button } from '@components/Button';
import { toast, ToastProvider, ToastContent } from './index';

const triggerSuccess = () =>
  toast.success('Changes saved', 'Your profile has been updated.');

const triggerError = () =>
  toast.error('Something went wrong', 'Please try again later.');

const triggerInfo = () =>
  toast.info('Heads up', 'Your session will expire in 5 minutes.');

const triggerSuccessSimple = () => toast.success('Order placed!');
const triggerErrorSimple = () => toast.error('Payment failed.');
const triggerInfoSimple = () => toast.info('New menu items available.');
const noOp = () => {};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    Story => (
      <View className="flex-1 items-center justify-center bg-gray-bg p-6 gap-4">
        <Story />

        <ToastProvider />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const AllTypes: Story = {
  render: () => (
    <View className="gap-3 w-full">
      <Button label="Show Success" onPress={triggerSuccess} variant="primary" />
      <Button label="Show Error" onPress={triggerError} variant="ghost" />
      <Button label="Show Info" onPress={triggerInfo} variant="secondary" />
    </View>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      label="Trigger Success"
      onPress={triggerSuccessSimple}
      variant="primary"
    />
  ),
};

export const Error: Story = {
  render: () => (
    <Button
      label="Trigger Error"
      onPress={triggerErrorSimple}
      variant="ghost"
    />
  ),
};

export const Info: Story = {
  render: () => (
    <Button
      label="Trigger Info"
      onPress={triggerInfoSimple}
      variant="secondary"
    />
  ),
};

export const SuccessContent: Story = {
  render: () => (
    <View className="w-full">
      <ToastContent
        type="success"
        text1="Changes saved"
        text2="Your profile has been updated."
        onPress={noOp}
        hide={noOp}
      />
    </View>
  ),
};

export const ErrorContent: Story = {
  render: () => (
    <View className="w-full">
      <ToastContent
        type="error"
        text1="Something went wrong"
        text2="Please try again later."
        onPress={noOp}
        hide={noOp}
      />
    </View>
  ),
};

export const InfoContent: Story = {
  render: () => (
    <View className="w-full">
      <ToastContent
        type="info"
        text1="Heads up"
        text2="Your session will expire in 5 minutes."
        onPress={noOp}
        hide={noOp}
      />
    </View>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <View className="gap-3 w-full">
      <ToastContent
        type="success"
        text1="Order placed!"
        onPress={noOp}
        hide={noOp}
      />
      <ToastContent
        type="error"
        text1="Payment failed."
        onPress={noOp}
        hide={noOp}
      />
      <ToastContent
        type="info"
        text1="New items available."
        onPress={noOp}
        hide={noOp}
      />
    </View>
  ),
};
