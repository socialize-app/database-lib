import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { Prisma, PrismaClient } from "./prisma-client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly options: Prisma.PrismaClientOptions) {
    super(options);
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log("Database connection established successfully.");
    } catch (error) {
      this.logger.error("Error connecting to database:", error);
      throw error; // Rethrow the error to propagate it further if needed
    }
  }
}
