// Icons
import { FacebookIcon, GoogleIcon, FingerprintIcon } from '@icons/index';

export const ICON_ASPECT_RATIO = 261 / 209;
export const DEFAULT_ICON_WIDTH = 240;

export const WELCOME_SUBTITLE =
  'Welcome to YumQuick — delicious meals delivered fast. Sign in or create an account to start ordering from your favorite local restaurants.';

export const LOGIN_SUBTITLE =
  'Log in with your email or mobile number to continue placing your favourite orders.';

export const SOCIAL_BUTTONS = [
  { id: 'google', Icon: GoogleIcon, label: 'Sign in with Google' },
  { id: 'facebook', Icon: FacebookIcon, label: 'Sign in with Facebook' },
  {
    id: 'fingerprint',
    Icon: FingerprintIcon,
    label: 'Sign in with biometrics',
  },
] as const;
