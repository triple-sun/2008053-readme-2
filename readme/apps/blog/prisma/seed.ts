import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
              type: 'LINK',
              tags: ['link-post', 'link'],
              likes: ['43', '58'],
              isDraft: false,
              isRepost: false,
              userId: '24',
              authorId: '24',
              originId: 1,
              webLink: 'www.test.com',
              desc: 'test link'
    },
  });
  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
              type: 'QUOTE',
              tags: ['quote-post', 'quote', 'tag'],
              likes: ['65', '22'],
              isDraft: false,
              isRepost: true,
              userId: '35',
              authorId: '24',
              originId: 1,
              quote: 'Lorem ipsum dolor set amet.',
              author: 'Michael Bay',
    },
  });
  await prisma.comment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      comment: 'test comment text',
      userId: '54',
      post: {
        connect: {
          id: 2
        }
      }
    }
  })
  await prisma.comment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      comment: 'another test comment text',
      userId: '65',
      post: {
        connect: {
          id: 2
        }
      }
    }
  })

  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
