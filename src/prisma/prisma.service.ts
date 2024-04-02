import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "../prisma-client";
import { checkEnvironment } from "./setup.utils";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger: Logger;
  constructor(private readonly prismaOptions?: Prisma.PrismaClientOptions) {
    checkEnvironment(prismaOptions);
    super(prismaOptions);
    this.logger = new Logger(PrismaService.name);
  }

  // Connect to the database when the module is initialized
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("Connected to the database");
    } catch (error) {
      this.logger.error("Error connecting to the database", error);
      throw error;
    }
  }

  // Disconnect from the database when the application shuts down
  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log("Disconnected from the database");
    } catch (error) {
      this.logger.error("Error disconnecting from the database", error);
      throw error;
    }
  }
}
