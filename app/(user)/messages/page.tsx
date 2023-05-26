import { notFound } from 'next/navigation';
import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { Chatbox } from '@/components/chatbox';
import { Icons } from '@/components/icons';
import { EmptyState } from '@/components/ui/empty-state';
import { Card } from '@/components/ui/card';
import { MessageCard } from '@/components/message-card';

const getChatsAndCurrentUser = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  const chats = await db.chat.findMany({
    where: {
      OR: [{ userOneId: currentUser.id }, { userTwoId: currentUser.id }],
    },
    include: {
      messages: {
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      listing: {
        include: {
          images: true,
          favorites: true,
        },
      },
      ratings: true,
    },
  });

  return { currentUser, chats };
};

const getUserAndListingById = async (userId: string, listingId: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  const listing = await db.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      images: true,
      favorites: true,
    },
  });

  return { user, listing };
};

interface Params {
  searchParams: {
    listingId: string;
    userId: string;
  };
}

const MessagesPage = async ({ searchParams }: Params) => {
  const chatsAndUser = await getChatsAndCurrentUser();

  const currentUser = chatsAndUser?.currentUser;
  const chats = chatsAndUser?.chats;

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
    const { user, listing } = await getUserAndListingById(userId, +listingId);

    if (!user || !listing) {
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
        listing={listing}
        currentUser={currentUser}
        user={user}
        chats={chats}
      />
    );
  }

  return (
    <Card className="text-sm">
      <div className="grid grid-cols-3 px-3 py-2 sm:grid-cols-4">
        <span>User</span>
        <span>Listing</span>
        <span>Message</span>
        <span className="hidden sm:inline">Date</span>
      </div>
      <hr />
      <div className="px-3 py-2">
        {chats?.map((item, i) => (
          // @ts-expect-error
          <MessageCard
            key={item.id}
            chat={item}
            currentUser={currentUser}
            lastItem={i === chats.length - 1}
          />
        ))}
      </div>
    </Card>
  );
};

export default MessagesPage;
