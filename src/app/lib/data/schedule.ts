import { prisma } from '@/app/lib/prisma';

export async function getSchedule(id: string) {
  try {
    const schedule = await prisma.schedule.findUnique({ where: { id } });
    return schedule;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch schedule data.');
  }
}

export async function getSchedulesByPostId(postId: string) {
  try {
    const schedules = await prisma.schedule.findMany({ where: { postId } });
    return schedules;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch schedule data.');
  }
}
