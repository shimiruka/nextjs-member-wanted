import { prisma } from '@/lib/prisma';

export async function getJoin(id: string) {
  try {
    const join = await prisma.join.findUnique({ where: { id } });
    return join;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch join data.');
  }
}

export async function getJoinsByPostId(postId: string) {
  try {
    const joins = await prisma.join.findMany({ where: { postId } });
    return joins;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch join data.');
  }
}
