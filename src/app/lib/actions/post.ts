'use server';

import { z } from 'zod';
import { prisma } from '@/app/lib/prisma';

const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  isPermanent: z.boolean(),
  userId: z.string().uuid(),
});

const CreatePost = PostSchema.omit({ id: true });
const UpdatePost = PostSchema;

export type State = {
  errors?: {
    id?: string[];
    title?: string[];
    description?: string[];
    isPermanent?: string[];
    userId?: string[];
  };
  message?: string | null;
};

export async function createPost(prevState: State, formData: FormData) {
  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    isPermanent: formData.get('isPermanent'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    };
  }

  const { title, description, isPermanent, userId } = validatedFields.data;

  try {
    await prisma.post.create({
      data: {
        title,
        description,
        isPermanent,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Post.',
    };
  }
}

export async function updatePost(prevState: State, formData: FormData) {
  const validatedFields = UpdatePost.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    description: formData.get('description'),
    isPermanent: formData.get('isPermanent'),
    userId: formData.get('userId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Post.',
    };
  }

  const { id, title, description, isPermanent, userId } = validatedFields.data;

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        description,
        isPermanent,
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Post.',
    };
  }
}
