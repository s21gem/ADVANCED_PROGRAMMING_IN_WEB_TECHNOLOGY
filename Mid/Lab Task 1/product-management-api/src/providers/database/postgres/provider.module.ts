import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "../../../config/database.config";
import { buildTypeOrmOptions } from "../../../database/typeorm.options";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...buildTypeOrmOptions(config.getOrThrow<DatabaseConfig>("database")),
        migrationsRun: true, // create/update tables on startup
      }),
    }),
  ],
})
export class PostgresDatabaseProviderModule {}
