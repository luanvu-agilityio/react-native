import React from 'react';
import ToastMessage from 'react-native-toast-message';

import { toastConfig } from './toastConfig';

/**
 * Place `<ToastProvider />` once at the root of your app (inside safe-area,
 * outside navigation) so toasts render above all other content.
 */
export const ToastProvider = () => <ToastMessage config={toastConfig} />;

export default ToastProvider;

export { toast } from './toast.service';
export { ToastContent } from './ToastContent';
export { ToastIcon } from './ToastIcon';
export type { ToastType, ToastIconProps, ToastContentProps } from './types';
