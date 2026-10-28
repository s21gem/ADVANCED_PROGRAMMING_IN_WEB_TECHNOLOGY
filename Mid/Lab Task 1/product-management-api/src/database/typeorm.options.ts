import { DataSourceOptions } from "typeorm";
import { DatabaseConfig } from "../config/database.config";
import { Employee } from "../modules/employee/entities/employee.entity";
import { Product } from "../modules/product/entities/product.entity";
import { CreateProductsTable1793232000000 } from "./migrations/1793232000000-create-products-table";
import { CreateEmployeesTable1793232000001 } from "./migrations/1793232000001-create-employees-table";

// Shared by the app and the TypeORM CLI. Tables come from migrations only.
export const buildTypeOrmOptions = (db: DatabaseConfig): DataSourceOptions => ({
  type: "postgres",
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [Product, Employee],
  migrations: [
    CreateProductsTable1793232000000,
    CreateEmployeesTable1793232000001,
  ],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: db.logging,
});
