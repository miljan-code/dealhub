import { notFound } from 'next/navigation';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { Chatbox } from '@/components/chatbox';
import { Icons } from '@/components/icons';
import { EmptyState } from '@/components/ui/empty-state';
import { Card } from '@/components/ui/card';

// const getChatsAndCurrentUser = async () => {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) return null;

//   const chats = await db.chat?.findMany({
//     where: {
//       OR: [{ userOneId: currentUser.id }, { userTwoId: currentUser.id }],
//     },
//     include: {
//       messages: true,
//       listing: {
//         include: {
//           images: true,
//           favorites: true,
//         },
//       },
//     },
//   });

//   return { currentUser, chats };
// };

const getUserAndListingById = async (userId: string, listingId: number) => {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      listings: {
        include: {
          images: true,
          favorites: true,
        },
        where: {
          id: listingId,
        },
      },
    },
  });
};

interface Params {
  searchParams: {
    listingId: string;
    userId: string;
  };
}

const MessagesPage = async ({ searchParams }: Params) => {
  const currentUser = await getCurrentUser();
  // const chatsAndUser = await getChatsAndCurrentUser();

  // const currentUser = chatsAndUser?.currentUser;
  // const chats = chatsAndUser?.chats;
  const chats: string[] = []; // TEMP

  const { listingId, userId } = searchParams;

  if (!currentUser) return notFound();

  if ((!chats || !chats.length) && (!listingId || !userId)) {
    return (
      <EmptyState>
        <Icons.folder size={96} />
        <EmptyState.Heading>There are no messages</EmptyState.Heading>
        <EmptyState.Text>
          Find an listing to send a message to a seller
        </EmptyState.Text>
      </EmptyState>
    );
  }

  if (listingId && userId) {
    const user = await getUserAndListingById(userId, +listingId);

    if (!user || !user.listings.length) {
      return (
        <EmptyState className="space-y-1.5">
          <Icons.sadFace size={96} />
          <EmptyState.Heading>
            There are no users or listings with that ID
          </EmptyState.Heading>
          <EmptyState.Text>
            Please, try to send message to another user
          </EmptyState.Text>
        </EmptyState>
      );
    }

    return (
      <Chatbox
        listings={user.listings}
        currentUser={currentUser}
        user={user}
        // chats={chats}
      />
    );
  }

  return (
    <Card>
      <div className="px-3 py-2">Hey There!</div>
    </Card>
  );
};

export default MessagesPage;
