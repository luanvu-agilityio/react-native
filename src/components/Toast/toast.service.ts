import ToastMessage from 'react-native-toast-message';

const showSuccess = (text1: string, text2?: string) =>
  ToastMessage.show({ type: 'success', text1, text2 });

const showError = (text1: string, text2?: string) =>
  ToastMessage.show({ type: 'error', text1, text2 });

const showInfo = (text1: string, text2?: string) =>
  ToastMessage.show({ type: 'info', text1, text2 });

/**
 * Imperative toast service.
 */
export const toast = {
  success: showSuccess,
  error: showError,
  info: showInfo,
  hide: ToastMessage.hide,
};
