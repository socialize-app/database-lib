import { Module, DynamicModule, Global } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { Prisma } from "./prisma-client";

@Global()
@Module({})
export class DatabaseModule {
  private static createDynamicModule(
    options?: Prisma.PrismaClientOptions
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
  static forRoot(options?: Prisma.PrismaClientOptions): DynamicModule {
    return this.createDynamicModule(options);
  }

  // Asynchronously create a dynamic module
  static forRootAsync(options: {
    imports?: any[];
    useFactory: (
      ...args: any[]
    ) => Promise<Prisma.PrismaClientOptions | undefined> | Prisma.PrismaClientOptions | undefined;
    inject?: any[];
  }): DynamicModule {
    const providers = [
      {
        provide: PrismaService,
        useFactory: async (...args: any[]) => {
          const prismaOptions = await options.useFactory(...args);
          if (!prismaOptions) {
            throw new Error('Prisma options must be provided');
          }
          return new PrismaService(prismaOptions);
        },
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