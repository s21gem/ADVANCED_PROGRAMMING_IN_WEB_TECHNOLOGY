import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { readDatabaseConfig } from "../config/database.config";
import { buildTypeOrmOptions } from "./typeorm.options";

// Used by the npm migration:* scripts.
export default new DataSource(buildTypeOrmOptions(readDatabaseConfig()));
