import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Alice123', 10);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      name: 'Alice',
      email: 'alice@prisma.io',
      password: password,
      posts: {
        create: {
          title: 'Alice Post',
          description: 'test1',
          isPermanent: true,
          tags: {
            create: [{ name: 'tag1' }, { name: 'tag2' }],
          },
          comments: {
            create: [
              {
                content: 'test1 comment',
              },
            ],
          },
        },
      },
    },
  });
  console.log({ alice });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
