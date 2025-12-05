import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('password123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@lovable.dev' },
    update: {},
    create: {
      email: 'admin@lovable.dev',
      firstName: 'Admin',
      lastName: 'User',
      password,
      role: 'hr-recruiter',
      avatarUrl: 'https://github.com/shadcn.png',
    },
  });

  console.log({ admin });
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
