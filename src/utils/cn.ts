import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['13', '15', '17', '24', '28', '32', '33', '35', '50'],
      radius: ['20', '24', '30', '32', '36', '50', '75', '100'],
      leading: ['4.5', '6.5'],
      spacing: [
        '7.5',
        '49',
        '62',
        '71',
        '80',
        '100',
        '108',
        '120',
        '130',
        '140',
        '170',
        '180',
        '200',
      ],
    },
    classGroups: {
      'border-w': ['border-3', 'border-5', 'border-10'],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
