/* import { Module, DynamicModule, Global } from "@nestjs/common";
import { PrismaService } from "./database.service";
import { Prisma } from "./prisma-client";

@Global()
@Module({})
export class DatabaseModule {
  private static createDynamicModule(
    options: Prisma.PrismaClientOptions
  ): DynamicModule {
    console.log("Creating dynamic module...");
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

  static forRoot(options: Prisma.PrismaClientOptions): DynamicModule {
    return this.createDynamicModule(options);
  }

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

  static register(options: Prisma.PrismaClientOptions): DynamicModule {
    return this.createDynamicModule(options);
  }

  static registerAsync(options: {
    useFactory: () => Prisma.PrismaClientOptions;
  }): DynamicModule {
    return this.createDynamicModule(options.useFactory());
  }

  static forFeature() {
    // This method is a placeholder for future use
  }
}
 */

import { Module, Global } from "@nestjs/common";
import { PrismaService } from "./database.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}