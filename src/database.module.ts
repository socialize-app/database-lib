import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./database.service";
import { Prisma } from "@prisma/client";

@Global()
@Module({})
export class DatabaseModule {
  private static createDynamicModule(options: Prisma.PrismaClientOptions) {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: PrismaService,
          useValue: new PrismaService(options),
        },
      ],
      exports: [PrismaService],
    };
  }

  static forRoot(options: Prisma.PrismaClientOptions) {
    return this.createDynamicModule(options);
  }

  static forRootAsync(options: {
    useFactory: () => Prisma.PrismaClientOptions;
  }) {
    return this.createDynamicModule(options.useFactory());
  }

  static register(options: Prisma.PrismaClientOptions) {
    return this.createDynamicModule(options);
  }

  static registerAsync(options: {
    useFactory: () => Prisma.PrismaClientOptions;
  }) {
    return this.createDynamicModule(options.useFactory());
  }

  static forFeature() {
    // This method is a placeholder for future use
  }
}
