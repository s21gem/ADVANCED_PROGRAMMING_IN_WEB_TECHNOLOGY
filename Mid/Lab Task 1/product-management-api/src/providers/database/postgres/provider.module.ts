import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "../../../config/database.config";
import { buildTypeOrmOptions } from "../../../database/typeorm.options";

/**
 * Opens the PostgreSQL connection for the whole app and applies any
 * pending migrations on startup, so the tables always exist.
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...buildTypeOrmOptions(config.getOrThrow<DatabaseConfig>("database")),
        migrationsRun: true,
      }),
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
