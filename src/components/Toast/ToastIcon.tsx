import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react-native';

import { ToastIconProps, ToastType } from './types';
import { ICON_SIZE, ICON_COLOR } from './constants';

const SuccessIcon = () => <CheckCircle size={ICON_SIZE} color={ICON_COLOR} />;
const ErrorIcon = () => <XCircle size={ICON_SIZE} color={ICON_COLOR} />;
const InfoIcon = () => <Info size={ICON_SIZE} color={ICON_COLOR} />;

const iconMap: Record<ToastType, () => React.JSX.Element> = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export const ToastIcon = ({ type }: ToastIconProps) => {
  const Icon = iconMap[type];

  return <Icon />;
};
