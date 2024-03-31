import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "./prisma-client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly options: Prisma.PrismaClientOptions) {
    super({
      datasources: { db: { url: "file:./dev.db" } },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
