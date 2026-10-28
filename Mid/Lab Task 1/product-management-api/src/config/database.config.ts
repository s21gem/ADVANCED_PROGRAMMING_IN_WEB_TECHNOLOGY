import { registerAs } from "@nestjs/config";

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
}

/**
 * Reads PostgreSQL settings from environment variables.
 * Shared by the Nest app (via ConfigService) and the TypeORM CLI data source.
 * Variable names follow the course boilerplate (DB_USER, DB_DATABASE, ...).
 */
export const readDatabaseConfig = (): DatabaseConfig => ({
  host: process.env.DB_HOST ?? "localhost",
  port: parseInt(process.env.DB_PORT ?? "5432", 10),
  username: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_DATABASE ?? "product_management_db",
  logging: process.env.DB_LOGGING === "true",
});

export const databaseConfig = registerAs("database", readDatabaseConfig);
