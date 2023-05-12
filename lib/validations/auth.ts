import * as z from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userRegisterSchema = userLoginSchema.extend({
  username: z.string().max(20).min(3),
});
