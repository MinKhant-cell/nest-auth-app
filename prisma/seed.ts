import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password', 10);

  // Create sample users
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com', 
        password: passwordHash,
        name: 'Admin User',
        role: 'admin',
      },
      {
        email: 'john@example.com',
        password: passwordHash,
        name: 'John Doe',
        role: 'user',
      },
      {
        email: 'jane@example.com',
        password: passwordHash,
        name: 'Jane Smith',
        role: 'user',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
