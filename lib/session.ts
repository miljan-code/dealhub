import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';

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
          favorites: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      favorites: {
        include: {
          listing: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });

  if (!currentUser) return null;

  return currentUser;
};
