import db from '@/lib/db';
import { FormData } from '@/components/create-listing-form';
import { getCurrentUser } from '@/lib/session';
import slugify from 'slugify';
import { createListingSchema } from '@/lib/validations/create-listing';
import { ZodError } from 'zod';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('Unauthorized', { status: 403 });
    }

    const data = (await req.json()) as FormData;

    createListingSchema.parse(data);

    const { images, ...listingData } = data;

    const listing = await db.listing.create({
      data: {
        ...listingData,
        authorId: currentUser.id,
        images: {
          createMany: {
            data: images.map(imageUrl => ({ imageUrl })),
          },
        },
        slug: slugify(listingData.title, { lower: true }),
      },
      include: {
        images: true,
      },
    });

    return new Response(JSON.stringify(listing), { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
