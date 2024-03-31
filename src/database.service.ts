import { Injectable, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "./prisma-client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly options: Prisma.PrismaClientOptions) {
    console.log("Got options:", options);
    super(options);
  }

  async onModuleInit() {
    await this.$connect();
  }
}
