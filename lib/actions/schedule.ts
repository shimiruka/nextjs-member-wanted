'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const ScheduleSchema = z.object({
  id: z.string().uuid(),
  dateTime: z.date(),
  postId: z.string().uuid(),
});

const CreateSchedule = ScheduleSchema.omit({ id: true });
const UpdateSchedule = ScheduleSchema;

export type State = {
  errors?: {
    id?: string[];
    dateTime?: string[];
    postId?: string[];
  };
  message?: string | null;
};

export async function createSchedule(prevState: State, formData: FormData) {
  const validatedFields = CreateSchedule.safeParse({
    dateTime: formData.get('dateTime'),
    postId: formData.get('postId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Schedule.',
    };
  }

  const { dateTime, postId } = validatedFields.data;

  try {
    await prisma.schedule.create({
      data: {
        dateTime,
        postId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Schedule.',
    };
  }
}

export async function updateSchedule(prevState: State, formData: FormData) {
  const validatedFields = UpdateSchedule.safeParse({
    id: formData.get('id'),
    dateTime: formData.get('dateTime'),
    postId: formData.get('postId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Schedule.',
    };
  }

  const { id, dateTime, postId } = validatedFields.data;

  try {
    await prisma.schedule.update({
      where: { id },
      data: {
        dateTime,
        postId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Update Schedule.',
    };
  }
}
