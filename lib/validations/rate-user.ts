import { z } from 'zod';

export const rateUserSchema = z.object({
  communication: z.boolean({
    required_error: 'Please, tell us if communication with user was smooth',
  }),
  description: z.boolean({
    required_error: 'Please, tell us if product has fit the description',
  }),
  honored: z.boolean({
    required_error: 'Please, tell us if seller/buyer has honored a promise',
  }),
  comment: z
    .string()
    .min(1, {
      message: 'Additional comment is required',
    })
    .max(255, {
      message: 'Additional comment can have maximum length of 255 characters',
    }),
});
