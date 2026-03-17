import { signInSchema, signUpSchema, EMAIL_REGEX, PHONE_REGEX } from '../utils';

describe('validation schemas', () => {
  it('signInSchema accepts valid email', () => {
    const valid = { emailOrPhone: 'user@example.com', password: 'password1' };
    expect(() => signInSchema.parse(valid)).not.toThrow();
  });

  it('signInSchema accepts valid phone', () => {
    const valid = { emailOrPhone: '+1234567890', password: 'password1' };
    expect(() => signInSchema.parse(valid)).not.toThrow();
  });

  it('signUpSchema rejects invalid email', () => {
    const invalid = {
      fullName: 'A',
      email: 'no-at',
      mobileNumber: '+1234567',
      dateOfBirth: '2000-01-01',
      password: 'password1',
    };
    expect(() => signUpSchema.parse(invalid)).toThrow();
  });

  it('regex constants work', () => {
    expect(EMAIL_REGEX.test('a@b.com')).toBe(true);
    expect(PHONE_REGEX.test('+123456789')).toBe(true);
  });
});
