import * as z from 'zod';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { userRegisterSchema } from '@/lib/validations/auth';
import db from '@/lib/db';

type FormData = z.infer<typeof userRegisterSchema>;

export async function POST(req: Request) {
  try {
    const formData = (await req.json()) as FormData;

    userRegisterSchema.parse(formData);

    const { username: name, email, password } = formData;

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return new Response(null, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Response('Email address is already in use', { status: 409 });
      }
    }

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response('Something went wrong', { status: 500 });
  }
}
