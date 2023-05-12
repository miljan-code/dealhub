import * as z from 'zod';

export const createListingSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(32, { message: 'Title must be maximum 32 characters long' }),
  category: z.string(),
  images: z
    .string()
    .array()
    .max(5, { message: 'Only 5 images per listing are allowed' })
    .optional(),
  price: z.number().positive({ message: 'Price must be greater than 0' }),
  isFixedPrice: z.boolean(),
  isTradeable: z.boolean(),
  condition: z.string(),
  description: z.string(),
  location: z.string(),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(32, { message: 'Username must be maximum 32 characters long' }),
  phone: z.string(),
});
