import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { readDatabaseConfig } from "../config/database.config";
import { buildTypeOrmOptions } from "./typeorm.options";

/**
 * Data source used by the TypeORM CLI
 * (npm run migration:run / migration:revert / migration:show).
 */
export default new DataSource(buildTypeOrmOptions(readDatabaseConfig()));
