import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

jest.mock('@components/ScreenLayout', () => {
  const _React = require('react') as typeof import('react');
  const RN = require('react-native') as typeof import('react-native');
  return {
    __esModule: true,
    default: ({ children }: { children?: React.ReactNode }) =>
      _React.createElement(RN.View, null, children),
  };
});

jest.mock('@components/features/PageHeader', () => {
  const _React = require('react') as typeof import('react');
  const RN = require('react-native') as typeof import('react-native');
  return {
    __esModule: true,
    default: ({ onBack }: { onBack?: () => void }) =>
      _React.createElement(
        RN.Pressable,
        { onPress: onBack, accessibilityLabel: 'go back' },
        null,
      ),
  };
});

jest.mock('@icons/LargeFingerprintIcon', () => {
  const _React = require('react') as typeof import('react');
  const RN = require('react-native') as typeof import('react-native');
  return {
    __esModule: true,
    default: ({ testID }: { testID?: string }) =>
      _React.createElement(RN.View, { testID }),
  };
});

jest.mock('@components/index', () => {
  const _React = require('react') as typeof import('react');
  const RN = require('react-native') as typeof import('react-native');
  return {
    __esModule: true,
    Typography: ({ children }: { children?: React.ReactNode }) =>
      _React.createElement(RN.Text, null, children),
    Button: ({
      label,
      onPress,
      accessibilityLabel,
    }: {
      label?: string;
      onPress?: () => void;
      accessibilityLabel?: string;
    }) =>
      _React.createElement(
        RN.Pressable,
        { onPress, accessibilityLabel: accessibilityLabel ?? label },
        _React.createElement(RN.Text, null, label),
      ),
  };
});

import SetFingerprintScreen from '../screens/SetFingerprintScreen';
import type { AuthScreenProps } from '@app-types/navigation';

describe('SetFingerprintScreen', () => {
  it('calls navigation.reset on Skip and Continue', async () => {
    const navigation = {
      reset: jest.fn(),
      goBack: jest.fn(),
    } as unknown as AuthScreenProps<'SetFingerprint'>['navigation'];

    const { getByLabelText } = render(
      <SetFingerprintScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'SetFingerprint'>['route']}
      />,
    );

    fireEvent.press(getByLabelText('Skip fingerprint setup'));
    await waitFor(() => expect(navigation.reset).toHaveBeenCalled());

    fireEvent.press(getByLabelText('Continue with fingerprint'));
    await waitFor(() => expect(navigation.reset).toHaveBeenCalledTimes(2));
  });

  it('calls navigation.goBack when back button pressed', () => {
    const navigation = {
      reset: jest.fn(),
      goBack: jest.fn(),
    } as unknown as AuthScreenProps<'SetFingerprint'>['navigation'];

    const { getByLabelText } = render(
      <SetFingerprintScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'SetFingerprint'>['route']}
      />,
    );

    fireEvent.press(getByLabelText('go back'));
    expect(navigation.goBack).toHaveBeenCalled();
  });

  it('toggles fingerprint active state when icon pressed', async () => {
    const navigation = {
      reset: jest.fn(),
      goBack: jest.fn(),
    } as unknown as AuthScreenProps<'SetFingerprint'>['navigation'];

    const { getByLabelText } = render(
      <SetFingerprintScreen
        navigation={navigation}
        route={{} as AuthScreenProps<'SetFingerprint'>['route']}
      />,
    );

    fireEvent.press(getByLabelText('Tap to scan fingerprint'));
    await waitFor(() =>
      expect(getByLabelText('Fingerprint scanned, tap to reset')).toBeTruthy(),
    );
  });
});
