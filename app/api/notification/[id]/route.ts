import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { Prisma } from '@prisma/client';

interface Params {
  id: string;
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('Unauthorized', { status: 403 });
    }

    const notification = currentUser.notifications.find(
      item => item.id === +params.id
    );

    if (!notification) {
      return new Response('You do not have a notification to mark as read', {
        status: 404,
      });
    }

    await db.notification.deleteMany({
      where: {
        id: +params.id,
        userId: currentUser.id,
      },
    });

    return new Response('Notification is successfuly deleted', { status: 202 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2001') {
        return new Response(
          `Notification with id of ${params.id} doesn't exist`,
          { status: 400 }
        );
      }
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
