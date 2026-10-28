import { MigrationInterface, QueryRunner, Table, TableCheck } from "typeorm";

export class CreateProductsTable1793232000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "120",
            isNullable: false,
          },
          {
            name: "category",
            type: "varchar",
            length: "80",
            isNullable: false,
          },
          {
            name: "price",
            type: "numeric",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: "quantity",
            type: "int",
            isNullable: false,
            default: 0,
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "CURRENT_TIMESTAMP",
          },
        ],
        checks: [
          new TableCheck({
            name: "CHK_products_price_non_negative",
            expression: `"price" >= 0`,
          }),
          new TableCheck({
            name: "CHK_products_quantity_non_negative",
            expression: `"quantity" >= 0`,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
