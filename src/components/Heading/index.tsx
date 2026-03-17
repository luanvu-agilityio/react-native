import { ComponentRef, ElementType, forwardRef, ReactNode } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

// Utils
import { cn } from '@utils/cn';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends RNTextProps {
  level?: HeadingLevel;
  children: ReactNode;
  as?: HeadingTag;
}

const levelClassMap: Record<HeadingLevel, string> = {
  1: 'text-35 font-primary-extrabold',
  2: 'text-33 font-primary-extrabold',
  3: 'text-32 font-primary-bold',
  4: 'text-28 font-primary-bold',
  5: 'text-2xl font-primary-semibold',
  6: 'text-xl font-primary-medium',
};

export const Heading = forwardRef<ComponentRef<typeof RNText>, HeadingProps>(
  ({ level = 1, children, className, style, as: Tag, ...props }, ref) => {
    const Component = (Tag ?? RNText) as ElementType;
    return (
      <Component
        ref={ref}
        accessibilityRole="header"
        className={cn('text-primary', levelClassMap[level], className)}
        style={style}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = 'Heading';

export default Heading;
