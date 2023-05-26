import * as z from 'zod';

export const createListingSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(32, { message: 'Title must be maximum 32 characters long' }),
  category: z.string({
    required_error: 'Category is required',
  }),
  images: z
    .string()
    .array()
    .max(5, { message: 'Only 5 images per listing are allowed' })
    .optional()
    .default([]),
  price: z
    .number({
      invalid_type_error: 'Price must be greater than 0.',
    })
    .positive({ message: 'Price must be greater than 0.' }),
  isFixedPrice: z.boolean().optional().default(false),
  isTradeable: z.boolean().optional().default(false),
  condition: z.string({
    required_error: 'Product condition is required',
  }),
  description: z
    .string()
    .max(1000, { message: 'Description must be maximum 1000 characters long' })
    .optional(),
  location: z
    .string()
    .min(1, {
      message: 'Location is required',
    })
    .max(32, { message: 'Location must be maximum 32 characters long' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long' })
    .max(32, { message: 'Username must be maximum 32 characters long' }),
  phoneNumber: z
    .string()
    .min(1, {
      message: 'Phone number is required',
    })
    .max(32, { message: 'Phone number must be maximum 32 characters long' }),
});
