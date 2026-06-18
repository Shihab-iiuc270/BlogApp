import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const getPrisma = () => {
  if (process.env.NODE_ENV === "production") {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient();
    }

    return globalForPrisma.prisma;
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }

  return globalForPrisma.prisma;
};

const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      return getPrisma()[prop];
    },
  }
);

export default prisma;
