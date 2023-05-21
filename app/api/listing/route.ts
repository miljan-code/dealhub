import db from '@/lib/db';
import { FormData } from '@/components/create-listing-form';
import { getCurrentUser } from '@/lib/session';
import slugify from 'slugify';

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new Error('You need to be logged in first!');
  }

  const data = (await req.json()) as FormData;

  const { images, ...listingData } = data;

  try {
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
    return new Response('Something went wrong!', { status: 500 });
  }
}