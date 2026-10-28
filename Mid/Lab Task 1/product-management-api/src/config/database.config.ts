import { registerAs } from "@nestjs/config";

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
}

// Also used by the TypeORM CLI, which runs outside Nest.
export const readDatabaseConfig = (): DatabaseConfig => ({
  host: process.env.DB_HOST ?? "localhost",
  port: parseInt(process.env.DB_PORT ?? "5432", 10),
  username: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_DATABASE ?? "product_management_db",
  logging: process.env.DB_LOGGING === "true",
});

export const databaseConfig = registerAs("database", readDatabaseConfig);
