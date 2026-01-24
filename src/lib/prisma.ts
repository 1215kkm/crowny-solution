import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  return globalForPrisma.prisma ?? new PrismaClient();
}

const prismaClient = createPrismaClient();

if (process.env.NODE_ENV !== "production" && prismaClient) {
  globalForPrisma.prisma = prismaClient;
}

export const prisma = prismaClient as PrismaClient;
