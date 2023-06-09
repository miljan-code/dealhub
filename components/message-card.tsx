import Link from 'next/link';
import { format } from 'date-fns';
import type { ChatWithListingAndMessages } from '@/components/chatbox';
import { User } from '@prisma/client';
import db from '@/lib/db';

interface MessageCardProps {
  chat: ChatWithListingAndMessages;
  lastItem?: boolean;
  currentUser: User;
}

export const getUserNameById = async (id: string) => {
  return await db.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
    },
  });
};

export const MessageCard = async ({
  chat,
  lastItem = false,
  currentUser,
}: MessageCardProps) => {
  const senderId =
    currentUser?.id === chat.userOneId ? chat.userTwoId : chat.userOneId;

  const sender = await getUserNameById(senderId);

  return (
    <>
      <Link
        href={`/messages?userId=${senderId}&listingId=${chat.listingId}`}
        className="grid grid-cols-3 items-center rounded-md px-2 py-2 transition hover:bg-accent sm:grid-cols-6"
      >
        <span className="truncate">{sender?.name || ''}</span>
        <span className="truncate sm:col-span-2">{chat.listing.title}</span>
        <span className="truncate text-foreground/50 sm:col-span-2">
          {chat.messages.at(0)?.message}
        </span>
        <span className="hidden truncate sm:inline">
          {format(
            new Date(chat.messages.at(-1)?.createdAt || ''),
            'dd. MMM yyyy'
          )}
        </span>
      </Link>
      {!lastItem && <hr />}
    </>
  );
};
