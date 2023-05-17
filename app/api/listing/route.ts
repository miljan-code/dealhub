import db from '@/lib/db';
import { FormData } from '@/components/create-listing-form';
import { getSession } from '@/lib/session';

export async function POST(req: Request) {
  const session = await getSession();

  if (!session?.user?.email) {
    return new Error('You need to be logged in first!');
  }

  const currentUser = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

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
