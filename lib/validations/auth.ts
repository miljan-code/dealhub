import * as z from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const userRegisterSchema = userLoginSchema.extend({
  username: z
    .string()
    .max(32, { message: 'Username must be maximum 32 characters long' })
    .min(3, { message: 'Username must be at least 3 characters long' }),
});
