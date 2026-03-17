import { View } from 'react-native';

// Utils
import { cn } from '@utils/cn';

// Constants
import {
  DIVIDER_BASE_CLASS,
  DIVIDER_COLOR_CLASS,
  DIVIDER_STYLE_CLASS,
} from './constants';

export interface DividerProps {
  color?: 'default' | 'yellow' | 'white';
  style?: 'solid' | 'dashed';
  classname?: string;
}

export const Divider = ({
  color = 'default',
  style = 'solid',
  classname,
}: DividerProps) => (
  <View
    className={cn(
      DIVIDER_BASE_CLASS,
      DIVIDER_COLOR_CLASS[color],
      DIVIDER_STYLE_CLASS[style],
      classname,
    )}
    accessible={false}
    importantForAccessibility="no"
    accessibilityElementsHidden
  />
);

export default Divider;
