import * as React from 'react';
import { render } from '@testing-library/react-native';
import { toastConfig } from '../toastConfig';

describe('toastConfig wrappers', () => {
  it('renders SuccessToast with given props', () => {
    const Success = toastConfig.success;
    const { getByText } = render(
      // @ts-expect-error using partial props for BaseToastProps shape in test
      <Success type="success" text1="OK" text2="done" />,
    );
    expect(getByText('OK')).toBeTruthy();
  });

  it('renders ErrorToast and InfoToast without crashing', () => {
    const ErrorToast = toastConfig.error;
    const InfoToast = toastConfig.info;
    const { getByText } = render(
      // @ts-expect-error partial props
      <ErrorToast type="error" text1="Err" />,
    );
    expect(getByText('Err')).toBeTruthy();

    render(
      // @ts-expect-error partial props
      <InfoToast type="info" text1="Note" />,
    );
  });
});
