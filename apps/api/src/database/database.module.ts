import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import type { Configuration } from "../config/configuration";

/** Compiled and source migration files under src/database/migrations/ */
export const migrations = [join(__dirname, "migrations", "*.{ts,js}")];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Configuration, true>) => {
        const isDevelopment = process.env.NODE_ENV === "development";

        return {
          type: "postgres" as const,
          url: configService.get("database.url", { infer: true }),
          autoLoadEntities: true,
          synchronize: false,
          logging: isDevelopment,
          migrations,
          migrationsTableName: "migrations",
          migrationsRun: false,
          extra: {
            max: 10,
            min: 2,
            idleTimeoutMillis: 30_000,
            connectionTimeoutMillis: 5_000,
          },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
