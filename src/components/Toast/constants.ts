import { ToastType } from './types';

export const ICON_SIZE = 20;
export const CLOSE_ICON_SIZE = 16;
export const ICON_COLOR = '#ffffff';

export const containerClassMap: Record<ToastType, string> = {
  success: 'bg-green-600',
  error: 'bg-red-500',
  info: 'bg-primary',
};
