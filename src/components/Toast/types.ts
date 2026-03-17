import { BaseToastProps } from 'react-native-toast-message';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastIconProps {
  type: ToastType;
}

export interface ToastContentProps extends BaseToastProps {
  type: ToastType;
  hide?: () => void;
}
