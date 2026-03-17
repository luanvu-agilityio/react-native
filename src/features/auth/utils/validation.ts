import { z } from 'zod';
import { VALIDATION_MESSAGES } from '@constants/message';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^\+?[0-9]{7,15}$/;

export const signInSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, VALIDATION_MESSAGES.emailOrPhoneRequired)
    .refine(value => EMAIL_REGEX.test(value) || PHONE_REGEX.test(value), {
      message: VALIDATION_MESSAGES.emailOrPhoneInvalid,
    }),
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.passwordRequired)
    .min(8, VALIDATION_MESSAGES.passwordMinLength),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  fullName: z.string().min(1, VALIDATION_MESSAGES.fullNameRequired),
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.emailRequired)
    .email(VALIDATION_MESSAGES.emailInvalid),
  mobileNumber: z
    .string()
    .min(1, VALIDATION_MESSAGES.mobileRequired)
    .regex(/^\+?[0-9]{7,15}$/, VALIDATION_MESSAGES.mobileInvalid),
  dateOfBirth: z.string().min(1, VALIDATION_MESSAGES.dateOfBirthRequired),
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.passwordRequired)
    .min(8, VALIDATION_MESSAGES.passwordMinLength),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
