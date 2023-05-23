import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';

interface Params {
  id: string;
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new Response('You must be logged in in order to rate an user', {
      status: 401,
    });
  }

  const notification = currentUser.notifications.find(
    item => item.id === +params.id
  );

  if (!notification) {
    return new Response('You do not have a notification to mark as read', {
      status: 404,
    });
  }

  try {
    await db.notification.delete({
      where: {
        id: +params.id,
      },
    });
  } catch (error) {
    // TODO: handle errors
  }
}
