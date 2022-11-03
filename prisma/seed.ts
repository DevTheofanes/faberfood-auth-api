import { PrismaClient } from '@prisma/client';
import { userClassification } from './seeders';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.userClassification.createMany({
    data: userClassification,
    skipDuplicates: true,
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
