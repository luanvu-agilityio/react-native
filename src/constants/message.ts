// Form validation messages
export const VALIDATION_MESSAGES = {
  // Sign In
  emailOrPhoneRequired: 'Email or mobile number is required',
  emailOrPhoneInvalid: 'Enter a valid email or mobile number',
  phoneSignInUnsupported:
    'Phone sign-in is not supported yet. Please use your email.',

  // Common
  passwordRequired: 'Password is required',
  passwordMinLength: 'Password must be at least 8 characters',

  // Sign Up
  fullNameRequired: 'Full name is required',
  emailRequired: 'Email is required',
  emailInvalid: 'Enter a valid email address',
  mobileRequired: 'Mobile number is required',
  mobileInvalid: 'Enter a valid mobile number',
  dateOfBirthRequired: 'Date of birth is required',
} as const;

// Auth error messages
export const AUTH_ERROR_MESSAGES = {
  // Fallback messages
  signInFailed: 'Sign in failed. Please try again.',
  registrationFailed: 'Registration failed. Please try again.',

  // INVALID_CREDENTIALS
  invalidCredentialsTitle: 'Sign in failed',
  invalidCredentialsMessage: 'Incorrect email or password. Please try again.',

  // EMAIL_EXISTS
  emailExistsTitle: 'Email taken',
  emailExistsMessage: 'An account with this email already exists.',

  // NETWORK_ERROR
  networkErrorTitle: 'Connection error',
  networkErrorMessage:
    'Could not reach the server. Check your connection and try again.',

  // UNKNOWN
  unknownErrorTitle: 'Something went wrong',
  unknownErrorMessage: 'An unexpected error occurred. Please try again.',
} as const;

// Toast messages (success / info notifications)
export const TOAST_MESSAGES = {
  // Auth
  loginSuccessTitle: 'Welcome back!',
  loginSuccessMessage: 'You have successfully logged in.',
  registrationSuccessTitle: 'Account created!',
  registrationSuccessMessage: 'Your account has been successfully created.',

  // Cart
  addedToCartTitle: 'Added to cart!',
  addedToCartMessage: 'Item added to your cart.',
  removedFromCartMessage: 'Removed from cart',
  itemRemovedMessage: 'Item removed from cart',

  // Generic
  unknownActionMessage: 'Action completed.',
} as const;
