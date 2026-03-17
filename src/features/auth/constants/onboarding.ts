import type { ComponentType } from 'react';
import CardIcon from '../../../icons/CardIcon';
import DeliveryIcon from '../../../icons/DeliveryIcon';
import OrderIcon from '../../../icons/OrderIcon';

export interface OnboardingSlide {
  id: string;
  image: ReturnType<typeof require>;
  Icon: ComponentType<{ width?: number; height?: number }>;
  title: string;
  description: string;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    image: require('@assets/images/onboarding/onboarding-1.webp'),
    Icon: OrderIcon,
    title: 'Order For Food',
    description:
      'Browse hundreds of restaurants near you and place your favourite meal order in just a few taps.',
  },
  {
    id: '2',
    image: require('@assets/images/onboarding/onboarding-2.webp'),
    Icon: CardIcon,
    title: 'Easy Payment',
    description:
      'Pay securely with your preferred method — credit card, digital wallet, or cash on delivery.',
  },
  {
    id: '3',
    image: require('@assets/images/onboarding/onboarding-3.webp'),
    Icon: DeliveryIcon,
    title: 'Fast Delivery',
    description:
      'Your food is prepared fresh and delivered hot to your doorstep in 30 minutes or less.',
  },
];

export const LAST_INDEX = ONBOARDING_SLIDES.length - 1;
export const IMAGE_HEIGHT_RATIO = 0.58;
