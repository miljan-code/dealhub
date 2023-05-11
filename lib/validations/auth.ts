import * as z from 'zod';

export const userRegisterSchema = z.object({
  username: z.string().max(20).min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
