'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const JoinSchema = z.object({
  id: z.string().uuid(),
  postId: z.string().uuid(),
  userId: z.string().uuid(),
});

const CreateJoin = JoinSchema.omit({ id: true });
const UpdateJoin = JoinSchema;

export type State = {
  errors?: {
    id?: string[];
    postId?: string[];
    userId?: string[];
  };
  message?: string | null;
};

export async function createJoin(prevState: State, formData: FormData) {
  const validatedFields = CreateJoin.safeParse({
    postId: formData.get('postId'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Join.',
    };
  }

  const { postId, userId } = validatedFields.data;

  try {
    await prisma.join.create({
      data: {
        postId,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Join.',
    };
  }
}

export async function updateJoin(prevState: State, formData: FormData) {
  const validatedFields = UpdateJoin.safeParse({
    id: formData.get('id'),
    postId: formData.get('postId'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Join.',
    };
  }

  const { id, postId, userId } = validatedFields.data;

  try {
    await prisma.join.update({
      where: { id },
      data: {
        postId,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Join.',
    };
  }
}
