import { DynamicModule, Global, Module } from "@nestjs/common";
import { ConfigService } from "./database.service";
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from "@nestjs/microservices";

// Import dotenv to read the environment variables
import * as dotenv from "dotenv";
dotenv.config();

// Read the port from the environment variables
const CONFIG_SERVICE_PORT = parseInt(process.env.CONFIG_SERVICE_PORT, 10);
if (isNaN(CONFIG_SERVICE_PORT)) {
  throw new Error("CONFIG_SERVICE_PORT is not defined in the environment");
}

const createConfigServiceOptions = (port: number): ClientProviderOptions => ({
  name: "R_CONFIG_SERVICE",
  transport: Transport.TCP,
  options: {
    port,
  },
});

const createConfigServiceClient = (port: number) =>
  ClientsModule.registerAsync([
    {
      name: "R_CONFIG_SERVICE",
      useFactory: () => createConfigServiceOptions(port),
    },
  ]);

@Global()
@Module({})
export class ConfigModule {
  static forRoot(
    configServicePort: number = CONFIG_SERVICE_PORT
  ): DynamicModule {
    return {
      module: ConfigModule,
      exports: [ConfigService],
      providers: [ConfigService],
      imports: [createConfigServiceClient(configServicePort)],
    };
  }

  static forRootAsync(
    configServicePort: number = CONFIG_SERVICE_PORT
  ): DynamicModule {
    return {
      module: ConfigModule,
      exports: [ConfigService],
      providers: [ConfigService],
      imports: [createConfigServiceClient(configServicePort)],
    };
  }

  static register(
    configServicePort: number = CONFIG_SERVICE_PORT
  ): DynamicModule {
    return {
      module: ConfigModule,
      exports: [ConfigService],
      providers: [ConfigService],
      imports: [createConfigServiceClient(configServicePort)],
    };
  }
}
