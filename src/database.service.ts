import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "./prisma-client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly options: Prisma.PrismaClientOptions) {
    console.log("Got options:", options);
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    console.log("ENV:", process.env.NODE_ENV);
    super(options);
  }

  async onModuleInit() {
    await this.$connect();
  }
}
