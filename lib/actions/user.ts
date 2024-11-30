'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const CreateUser = UserSchema.omit({ id: true });
const UpdateUser = UserSchema;

export type State = {
  errors?: {
    id?: string[];
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  // revalidatePath('/dashboard/invoices');
  // redirect('/dashboard/invoices');
}

export async function updateUser(prevState: State, formData: FormData) {
  const validatedFields = UpdateUser.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }

  const { id, name, email, password } = validatedFields.data;

  try {
    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update User.',
    };
  }

  // revalidatePath('/dashboard/invoices');
  // redirect('/dashboard/invoices');
}
