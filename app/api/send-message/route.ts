import db from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { Chat, Message, Prisma } from '@prisma/client';

interface Data {
  senderId: string;
  receiverId: string;
  listingId: number;
  message: string;
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Response('Unauthorized', { status: 403 });
    }

    const { listingId, message, receiverId, senderId } =
      (await req.json()) as Data;

    if (receiverId === senderId) {
      throw new Response('Unauthorized', { status: 403 });
    }

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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2001') {
        return new Response(
          'You can not send message to the chat that does not exist',
          {
            status: 409,
          }
        );
      }
    }

    return new Response('Something went wrong!', { status: 500 });
  }
}
