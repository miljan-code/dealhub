import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { Prisma } from '@prisma/client';

interface Data {
  listingId: number;
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('Unauthorized', { status: 403 });
    }

    const data = (await req.json()) as Data;

    const favorite = await db.favorite.create({
      data: {
        userId: currentUser.id,
        listingId: data.listingId,
      },
    });

    return new Response(JSON.stringify(favorite), { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Response('Item is already in your favorites', {
          status: 409,
        });
      }
    }
    return new Response('Something went wrong!', { status: 500 });
  }
}
