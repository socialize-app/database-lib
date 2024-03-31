import { Prisma } from "../prisma-client";
import { Logger } from "@nestjs/common";

export const checkEnvironment = (
  prismaOptions?: Prisma.PrismaClientOptions
) => {
  const logger = new Logger("checkPrismaEnvironment");

  if (!process.env.DATABASE_URL && !prismaOptions?.datasources?.db?.url) {
    logger.log(
      "DATABASE_URL environment variable is not set, and no client options where passed into it."
    );
    return false;
  }

  if (process.env.DATABASE_URL && !prismaOptions?.datasources?.db?.url) {
    logger.log(
      "DATABASE_URL environment variable is set, but no client options where passed into it which is recommended."
    );
  }
  return true;
};
