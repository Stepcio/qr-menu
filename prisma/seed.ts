import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.restaurant.create({
    data: {
      name: 'Restauracja',
      logo: '',
      addresses: [
        'Łabiszyńska 25'
      ],
    },
  });

  await prisma.post.create({
    data: {
      title: 'First Post',
      content: 'This is the first post.',
      authorId: alice.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
