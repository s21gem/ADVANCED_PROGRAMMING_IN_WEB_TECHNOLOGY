import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { readDatabaseConfig } from "../config/database.config";

// npm run db:create -> creates DB_DATABASE if it does not exist.
async function main() {
  const db = readDatabaseConfig();

  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(db.database)) {
    throw new Error(`Invalid DB_DATABASE "${db.database}"`);
  }

  // Connect to the default "postgres" maintenance database.
  const admin = new DataSource({
    type: "postgres",
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: "postgres",
  });

  await admin.initialize();
  try {
    const rows: unknown[] = await admin.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [db.database],
    );

    if (rows.length > 0) {
      console.log(`Database "${db.database}" already exists.`);
    } else {
      await admin.query(`CREATE DATABASE "${db.database}"`);
      console.log(`Database "${db.database}" created.`);
    }
  } finally {
    await admin.destroy();
  }
}

main().catch((err: Error) => {
  console.error(`Could not create database: ${err.message}`);
  process.exit(1);
});
