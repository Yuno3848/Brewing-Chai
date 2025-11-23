import { z } from 'zod';

export const signUpSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

export const verify = z.object({
  params: z.object({
    token: z.string().regex(/^[a-f0-9]{64}$/, 'Invalid or malformed verification token'),
  }),
});

export const signIn = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

export const validateEmail = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
  }),
});

export const validateResetPassword = z.object({
  params: z.object({
    token: z.string().regex(/^[a-f0-9]{64}$/, 'Invalid or malformed verification token'),
  }),
});
