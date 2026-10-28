import { MigrationInterface, QueryRunner, Table, TableCheck } from "typeorm";

export class CreateEmployeesTable1793232000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "employees",
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
            name: "email",
            type: "varchar",
            length: "150",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "phone",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "age",
            type: "int",
            isNullable: false,
          },
          {
            name: "years_of_working",
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
            name: "CHK_employees_age_range",
            expression: `"age" BETWEEN 18 AND 100`,
          }),
          new TableCheck({
            name: "CHK_employees_years_non_negative",
            expression: `"years_of_working" >= 0`,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("employees");
  }
}
