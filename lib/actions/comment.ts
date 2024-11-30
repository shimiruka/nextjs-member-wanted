'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const CommentSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  postId: z.string().uuid(),
  userId: z.string().uuid().nullable(),
});

const CreateComment = CommentSchema.omit({ id: true });
const UpdateComment = CommentSchema;

export type State = {
  errors?: {
    id?: string[];
    content?: string[];
    postId?: string[];
    userId?: string[];
  };
  message?: string | null;
};

export async function createComment(prevState: State, formData: FormData) {
  const validatedFields = CreateComment.safeParse({
    content: formData.get('content'),
    postId: formData.get('postId'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Comment.',
    };
  }

  const { content, postId, userId } = validatedFields.data;

  try {
    await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Comment.',
    };
  }
}

export async function updateComment(prevState: State, formData: FormData) {
  const validatedFields = UpdateComment.safeParse({
    id: formData.get('id'),
    content: formData.get('content'),
    postId: formData.get('postId'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Comment.',
    };
  }

  const { id, content, postId, userId } = validatedFields.data;

  try {
    await prisma.comment.update({
      where: { id },
      data: {
        content,
        postId,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Comment.',
    };
  }
}
