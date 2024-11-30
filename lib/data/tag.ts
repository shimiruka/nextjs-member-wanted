import { prisma } from '@/lib/prisma';

export async function getTag(id: string) {
  try {
    const tag = await prisma.tag.findUnique({ where: { id } });
    return tag;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tag data.');
  }
}

export async function getAllTags() {
  try {
    const tags = await prisma.tag.findMany();
    return tags;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tag data.');
  }
}

export async function getTagsByPostId(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        tags: true,
      },
    });
    return post?.tags || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tag data.');
  }
}
