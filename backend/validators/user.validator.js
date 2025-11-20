import { z } from 'zod';

export const signUpSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().min(8, 'Password must be at least 8 characters'),
    avatar: z
      .object({
        url: z.string().optional(),
        localPath: z.string().optional(),
      })
      .optional(),
  }),
});
