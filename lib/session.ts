import { getServerSession } from 'next-auth';

import { authOptions } from './auth';
import db from './db';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  const session = await getSession();

  if (!session) return null;

  const currentUser = await db.user.findUnique({
    where: {
      email: session.user?.email || undefined,
    },
    include: {
      listings: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!currentUser) return null;

  return currentUser;
};
