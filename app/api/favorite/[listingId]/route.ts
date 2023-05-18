import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

interface Params {
  listingId: string;
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new Error('You need to be logged in first!');
  }

  try {
    await db.favorite.delete({
      where: {
        userId_listingId: {
          userId: currentUser.id,
          listingId: +params.listingId,
        },
      },
    });

    return new Response('Success', { status: 200 });
  } catch (error) {
    return new Response('Something went wrong!', { status: 500 });
  }
}
