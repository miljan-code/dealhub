import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import type { Chat, Message } from '@prisma/client';
import { revalidatePath } from 'next/cache';

interface Data {
  senderId: string;
  receiverId: string;
  listingId: number;
  message: string;
}

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error('You need to be logged in first');
  }

  const { listingId, message, receiverId, senderId } =
    (await req.json()) as Data;

  if (receiverId === senderId) {
    throw new Error('You can not send message to yourself');
  }

  try {
    const chat = await db.chat.findFirst({
      where: {
        listingId,
        OR: [
          {
            OR: [{ userOneId: senderId }, { userTwoId: senderId }],
          },
          {
            OR: [{ userOneId: receiverId }, { userTwoId: receiverId }],
          },
        ],
      },
    });

    let response: Chat | Message;

    if (!chat) {
      response = await db.chat.create({
        data: {
          userOneId: senderId,
          userTwoId: receiverId,
          listingId,
          messages: {
            create: {
              senderId,
              message,
            },
          },
        },
      });
    } else {
      response = await db.message.create({
        data: {
          senderId,
          message,
          chatId: chat.id,
        },
      });
    }

    return new Response(JSON.stringify(response), { status: 201 });
  } catch (error) {
    return new Response('Something went wrong!', { status: 500 });
  }
}
