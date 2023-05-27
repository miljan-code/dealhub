import { z } from 'zod';
import { rateUserSchema } from '@/lib/validations/rate-user';
import { getCurrentUser } from '@/lib/session';
import db from '@/lib/db';
import { Prisma } from '@prisma/client';

type RateUserData = z.infer<typeof rateUserSchema> & {
  chatId: number;
  listingId: number;
  authorId: string;
  ratedUserId: string;
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as RateUserData;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('Unauthorized', { status: 403 });
    }

    // 1. Check if authorId === currentUser
    if (currentUser.id !== data.authorId) {
      return new Response(
        'You are not authorized to rate user on behalf of other user',
        { status: 401 }
      );
    }

    // 2. Check if user try to rate himself
    if (currentUser.id === data.ratedUserId) {
      return new Response('You are not allowed to rate yourself', {
        status: 403,
      });
    }

    // 3. Validate data with Zod
    const formData = rateUserSchema.parse({
      communication: data.communication,
      description: data.description,
      honored: data.honored,
      comment: data.comment,
    });

    // 4. Check if listing/user is eligible for rating
    const chat = await db.chat.findUnique({
      where: {
        id: data.chatId,
      },
      include: {
        messages: true,
      },
    });

    if (!chat) {
      return new Response('Chat not found', { status: 404 });
    }

    const userIds = [currentUser.id, data.ratedUserId];
    const chatParticipantIds = chat.messages.map(item => item.senderId);

    const chatIsValid = userIds.every(id => chatParticipantIds.includes(id));

    if (!chatIsValid) {
      return new Response(
        'You can not rate desired user because you do not have any conversation with each other',
        { status: 402 }
      );
    }

    const overallRating =
      [formData.communication, formData.description, formData.honored].filter(
        item => item
      ).length >= 2;

    const rating = await db.rating.create({
      data: {
        authorId: data.authorId,
        ratedUserId: data.ratedUserId,
        listingId: chat.listingId,
        chatId: chat.id,
        comment: formData.comment,
        communcation: formData.communication,
        description: formData.description,
        promise: formData.honored,
        overallRating: overallRating,
      },
    });

    if (rating) {
      await db.notification.create({
        data: {
          title: 'You have a new rating',
          description: `User ${
            currentUser.name
          } just rated you with an overall ${
            overallRating ? 'positive' : 'negative'
          } rating. You can see this rating at ratings page.`,
          userId: data.ratedUserId,
        },
      });
    }

    return new Response(JSON.stringify(rating), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Response(
          'You have already rated that user for desired listing',
          {
            status: 409,
          }
        );
      }
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
