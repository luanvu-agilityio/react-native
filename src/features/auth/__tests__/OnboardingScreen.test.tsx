import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

jest.mock('@components/index', () => {
  const _React = require('react') as typeof import('react');
  const RN = require('react-native') as typeof import('react-native');
  return {
    __esModule: true,
    Heading: ({ children }: { children?: React.ReactNode }) =>
      _React.createElement(RN.Text, null, children),
    Typography: ({ children }: { children?: React.ReactNode }) =>
      _React.createElement(RN.Text, null, children),
    Button: ({ label, onPress }: { label?: string; onPress?: () => void }) =>
      _React.createElement(
        RN.Pressable,
        { onPress, accessibilityLabel: label },
        _React.createElement(RN.Text, null, label),
      ),
  };
});

jest.mock('@components/features', () => ({
  __esModule: true,
  DotIndicators: () => null,
}));

jest.mock('@store/authStore', () => ({
  useAuthStore: (selector: Function) =>
    selector({ markOnboardingSeen: jest.fn() }),
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  if (RN.FlatList?.prototype) {
    RN.FlatList.prototype.scrollToIndex = () => {};
  }
  return RN;
});

import OnboardingScreen from '../screens/OnboardingScreen';
import type { AuthScreenProps } from '@app-types/navigation';

describe('OnboardingScreen', () => {
  it('calls markOnboardingSeen and replaces navigation when skipping', async () => {
    const navigation = {
      replace: jest.fn(),
    } as unknown as AuthScreenProps<'Onboarding'>['navigation'];

    const { getByLabelText } = render(
      <OnboardingScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'Onboarding'>['route']}
      />,
    );

    fireEvent.press(getByLabelText('Skip onboarding'));
    await waitFor(() =>
      expect(navigation.replace).toHaveBeenCalledWith('Welcome'),
    );
  });

  it('advances slides with Next and navigates to Welcome on Get Started', async () => {
    const navigation = {
      replace: jest.fn(),
    } as unknown as AuthScreenProps<'Onboarding'>['navigation'];

    const { getByLabelText } = render(
      <OnboardingScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'Onboarding'>['route']}
      />,
    );

    fireEvent.press(getByLabelText('Next'));
    await waitFor(() => expect(getByLabelText('Next')).toBeTruthy());
    fireEvent.press(getByLabelText('Next'));

    await waitFor(() => expect(getByLabelText('Get Started')).toBeTruthy());
    fireEvent.press(getByLabelText('Get Started'));
    await waitFor(() =>
      expect(navigation.replace).toHaveBeenCalledWith('Welcome'),
    );
  });
});
