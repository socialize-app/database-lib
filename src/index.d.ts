import { PrismaClient } from "@prisma/client";

export * from "./prisma-client/index.d";

export interface Context {
  prisma: PrismaClient;
}
