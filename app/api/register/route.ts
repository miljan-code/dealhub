import * as z from 'zod';
import bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { userRegisterSchema } from '@/lib/validations/auth';
import db from '@/lib/db';

type FormData = z.infer<typeof userRegisterSchema>;

export async function POST(req: Request) {
  const formData = (await req.json()) as FormData;
  const { username: name, email, password } = formData;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return new Response(null);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Response('Email address is already in use', { status: 409 });
      }
    }
  }
}
