import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { Prisma } from '@prisma/client';

interface Params {
  listingId: string;
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('Unauthorized', { status: 403 });
    }

    await db.listing.deleteMany({
      where: {
        id: +params.listingId,
        authorId: currentUser.id,
      },
    });

    return new Response('Success', { status: 202 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2001') {
        return new Response(
          `Listing with id of ${params.listingId} doesn't exist`,
          { status: 400 }
        );
      }
    }

    return new Response('Something went wrong!', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    await db.listing.update({
      where: {
        id: +params.listingId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return new Response('Success', { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2001') {
        return new Response(
          `Listing with id of ${params.listingId} doesn't exist`,
          { status: 400 }
        );
      }
    }

    return new Response('Something went wrong!', { status: 500 });
  }
}
