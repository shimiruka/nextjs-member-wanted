import { prisma } from '@/app/lib/prisma';

export async function getPost(id: string) {
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    return post;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post data.');
  }
}

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post data.');
  }
}

export async function getPostsByTagId(tagIg: string) {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id: tagIg,
      },
      include: {
        posts: true,
      },
    });
    return tag?.posts || [];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post data.');
  }
}
