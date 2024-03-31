import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Prisma, PrismaClient } from "../prisma-client";
import { checkEnvironment } from "./setup.utils";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly prismaOptions?: Prisma.PrismaClientOptions) {
    checkEnvironment(prismaOptions);
    super(prismaOptions);
  }

  // Connect to the database when the module is initialized
  async onModuleInit() {
    try {
      await this.$connect();
      console.log("Connected to the database");
    } catch (error) {
      console.error("Error connecting to the database", error);
      throw error;
    }
  }

  // Disconnect from the database when the application shuts down
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log("Disconnected from the database");
    } catch (error) {
      console.error("Error disconnecting from the database", error);
      throw error;
    }
  }
}
