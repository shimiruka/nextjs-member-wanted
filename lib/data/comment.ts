import { prisma } from '@/lib/prisma';

export async function getComment(id: string) {
  try {
    const comment = await prisma.comment.findUnique({ where: { id } });
    return comment;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comment data.');
  }
}

export async function getCommentsByPostId(postId: string) {
  try {
    const comments = await prisma.comment.findMany({ where: { postId } });
    return comments;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comment data.');
  }
}
