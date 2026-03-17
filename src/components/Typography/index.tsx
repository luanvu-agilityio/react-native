import { ComponentRef, ElementType, forwardRef, ReactNode } from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

// Utils
import { cn } from '@utils/cn';

const typographyVariants = cva('text-dark', {
  variants: {
    variant: {
      '2xl': 'text-3xl',
      xl: 'text-2xl',
      lg: 'text-17',
      md: 'text-base',
      sm: 'text-15',
      xs: 'text-13',
    },
    weight: {
      light: 'font-secondary-light',
      regular: 'font-secondary',
      medium: 'font-secondary-medium',
      semibold: 'font-secondary-semibold',
      bold: 'font-secondary-bold',
      extrabold: 'font-secondary-extrabold',
    },
  },
  defaultVariants: {
    variant: 'md',
    weight: 'regular',
  },
});

export type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>['variant']
>;
export type TypographyWeight = NonNullable<
  VariantProps<typeof typographyVariants>['weight']
>;

export type TypographyTag = 'p' | 'span';

export interface TypographyProps
  extends RNTextProps,
    VariantProps<typeof typographyVariants> {
  children: ReactNode;
  as?: TypographyTag;
}

export const Typography = forwardRef<
  ComponentRef<typeof RNText>,
  TypographyProps
>(({ variant, weight, children, className, style, as: Tag, ...props }, ref) => {
  const Component = (Tag ?? RNText) as ElementType;
  return (
    <Component
      ref={ref}
      className={cn(typographyVariants({ variant, weight }), className)}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';

export default Typography;
