export const CONTAINER_BASE_CLASS =
  'flex-row items-center  self-start px-1.5 py-0.5';

export const CONTAINER_SHAPE_CLASSES: Record<'pill' | 'tag', string> = {
  pill: 'rounded-full',
  tag: 'rounded-l-full rounded-r-none',
};

export const CONTAINER_VARIANT_CLASSES: Record<
  'primary' | 'outline' | 'counter',
  string
> = {
  primary: 'bg-secondary',
  outline: 'bg-white border border-gray-300',
  counter: 'bg-red-500',
};

export const TEXT_VARIANT_CLASSES: Record<
  'primary' | 'outline' | 'counter',
  string
> = {
  primary: 'text-white font-primary-medium text-xs',
  outline: 'text-dark font-primary-medium text-xs',
  counter: 'text-white text-[8px] font-bold leading-none',
};

export const STAR_ICON_SIZE = 14;
export const STAR_ICON_FILL_PRIMARY = '#E95322';
export const STAR_ICON_FILL_OUTLINE = '#F5CB58';
export const STAR_ICON_STROKE = 'transparent';
