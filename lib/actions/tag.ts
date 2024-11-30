'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

const CreateTag = TagSchema.omit({ id: true });

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateTag.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Tag.',
    };
  }

  const { name } = validatedFields.data;

  try {
    await prisma.tag.create({
      data: {
        name,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Tag.',
    };
  }
}
