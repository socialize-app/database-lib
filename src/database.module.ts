import { Module, DynamicModule, Global } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { Prisma } from "./prisma-client";

@Global()
@Module({})
export class DatabaseModule {
  private static createDynamicModule(
    options: Prisma.PrismaClientOptions
  ): DynamicModule {
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

  // Synchronously create a dynamic module
  static forRoot(options: Prisma.PrismaClientOptions): DynamicModule {
    return this.createDynamicModule(options);
  }

  // Asynchronously create a dynamic module
  static forRootAsync(options: {
    imports?: any[];
    useFactory: (
      ...args: any[]
    ) => Promise<Prisma.PrismaClientOptions> | Prisma.PrismaClientOptions;
    inject?: any[];
  }): DynamicModule {
    const providers = [
      {
        provide: PrismaService,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
    return {
      module: DatabaseModule,
      imports: options.imports || [],
      providers,
      exports: providers,
    };
  }
}