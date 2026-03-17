import React from 'react';
import { BaseToastProps, ToastConfig } from 'react-native-toast-message';

import { ToastContent } from './ToastContent';

const SuccessToast = (props: BaseToastProps) => (
  <ToastContent {...props} type="success" />
);

const ErrorToast = (props: BaseToastProps) => (
  <ToastContent {...props} type="error" />
);

const InfoToast = (props: BaseToastProps) => (
  <ToastContent {...props} type="info" />
);

export const toastConfig: ToastConfig = {
  success: SuccessToast,
  error: ErrorToast,
  info: InfoToast,
};
