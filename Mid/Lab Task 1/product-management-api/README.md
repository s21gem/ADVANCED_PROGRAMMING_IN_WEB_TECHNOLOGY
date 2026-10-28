# Product Management API (Lab Task 1)

**Course:** Advanced Programming in Web Technology
**Task:** Mid, Lab Task 1

| SL | Name          | Student ID | Section |
|----|---------------|------------|---------|
| 8  | Musa Abdullah | 22-49674-3 | B       |

A REST API for a small shop to manage products and employees, built with
NestJS, TypeORM and PostgreSQL.

## Tech stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Framework  | NestJS 11 (TypeScript)                      |
| ORM        | TypeORM 0.3                                 |
| Database   | PostgreSQL (tested on PostgreSQL 18)        |
| Validation | class-validator + class-transformer         |
| Config     | @nestjs/config + `.env`                     |

## Project structure

```
product-management-api/
├── screenshots/                    # Postman screenshots
├── src/
│   ├── common/
│   │   ├── filters/                # DB error → HTTP (duplicate email → 409)
│   │   ├── helpers/                # password hashing (scrypt)
│   │   ├── pipes/                  # rejects empty PATCH bodies
│   │   └── transformers/           # NUMERIC → number for price
│   ├── config/                     # app + database config from .env
│   ├── database/
│   │   ├── migrations/             # creates products & employees tables
│   │   ├── data-source.ts          # TypeORM CLI data source
│   │   └── typeorm.options.ts      # shared connection options
│   ├── modules/
│   │   ├── product/
│   │   │   ├── dto/product.dto.ts  # CreateProductDto + UpdateProductDto
│   │   │   ├── entities/           # Product entity
│   │   │   ├── product.controller.ts
│   │   │   ├── product.module.ts
│   │   │   └── product.service.ts
│   │   └── employee/
│   │       ├── dto/employee.dto.ts # CreateEmployeeDto + UpdateEmployeeDto
│   │       ├── entities/           # Employee entity
│   │       ├── employee.controller.ts
│   │       ├── employee.module.ts
│   │       └── employee.service.ts
│   ├── providers/database/postgres/
│   │   └── provider.module.ts      # TypeORM connection for the app
│   ├── script/create-database.ts   # npm run db:create
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── .env.example
├── .gitignore
├── nest-cli.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── tsconfig.build.json
```

## Prerequisites

- **Node.js** 20 or newer (`node -v`)
- **PostgreSQL** running locally (default port `5432`)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the sample file and put your own PostgreSQL password in it:

```bash
cp .env.example .env
```

| Variable      | Example                   | Description                     |
|---------------|---------------------------|---------------------------------|
| `PORT`        | `5001`                    | Port the API listens on         |
| `DB_HOST`     | `localhost`               | PostgreSQL host                 |
| `DB_PORT`     | `5432`                    | PostgreSQL port                 |
| `DB_USER`     | `postgres`                | PostgreSQL user                 |
| `DB_PASSWORD` | `your_postgres_password`  | PostgreSQL password             |
| `DB_DATABASE` | `product_management_db`   | Database name                   |
| `DB_LOGGING`  | `false`                   | `true` prints every SQL query   |

### 3. Create the database

Either run the helper script:

```bash
npm run db:create
```

or create it manually in **psql** / **pgAdmin**:

```sql
CREATE DATABASE product_management_db;
```

### 4. Run the app

```bash
npm run start:dev
```

The tables are created automatically on startup by the TypeORM migrations in
`src/database/migrations/`. The server runs at **http://localhost:5001**.

Other commands:

| Command                    | Purpose                                 |
|----------------------------|-----------------------------------------|
| `npm run build`            | Compile to `dist/`                      |
| `npm run start:prod`       | Run the compiled build                  |
| `npm run migration:run`    | Apply migrations manually               |
| `npm run migration:revert` | Undo the last migration                 |
| `npm run migration:show`   | List applied / pending migrations       |

## Database schema

**products**

| Column       | Type            | Notes                     |
|--------------|-----------------|---------------------------|
| `id`         | `SERIAL`        | Primary key (generated)   |
| `name`       | `VARCHAR(120)`  | Required                  |
| `category`   | `VARCHAR(80)`   | Required                  |
| `price`      | `NUMERIC(10,2)` | Required, `>= 0`          |
| `quantity`   | `INTEGER`       | Required, `>= 0`          |
| `created_at` | `TIMESTAMPTZ`   | Set automatically         |
| `updated_at` | `TIMESTAMPTZ`   | Updated automatically     |

**employees**

| Column             | Type           | Notes                          |
|--------------------|----------------|--------------------------------|
| `id`               | `SERIAL`       | Primary key (generated)        |
| `name`             | `VARCHAR(120)` | Required                       |
| `email`            | `VARCHAR(150)` | Required, unique               |
| `phone`            | `VARCHAR(20)`  | Required                       |
| `password`         | `VARCHAR(255)` | Stored hashed                  |
| `age`              | `INTEGER`      | 18 to 100                      |
| `years_of_working` | `INTEGER`      | `>= 0`                         |
| `created_at`       | `TIMESTAMPTZ`  | Set automatically              |
| `updated_at`       | `TIMESTAMPTZ`  | Updated automatically          |

## API endpoints

Base URL: `http://localhost:5001`

### Products

| Method   | Endpoint        | Description               | Success |
|----------|-----------------|---------------------------|---------|
| `POST`   | `/products`     | Create and save a product | `201`   |
| `GET`    | `/products`     | Return all products       | `200`   |
| `GET`    | `/products/:id` | Return one product        | `200`   |
| `PATCH`  | `/products/:id` | Update a product          | `200`   |
| `DELETE` | `/products/:id` | Delete a product          | `200`   |

**Create body**

```json
{
  "name": "HP Pavilion 15 Laptop",
  "category": "Electronics",
  "price": 78500.00,
  "quantity": 12
}
```

**Update body** (send only the fields to change):

```json
{
  "price": 74999.99,
  "quantity": 9
}
```

### Employees

| Method   | Endpoint         | Description                 | Success |
|----------|------------------|-----------------------------|---------|
| `POST`   | `/employees`     | Create and save an employee | `201`   |
| `GET`    | `/employees`     | Return all employees        | `200`   |
| `GET`    | `/employees/:id` | Return one employee         | `200`   |
| `PATCH`  | `/employees/:id` | Update an employee          | `200`   |
| `DELETE` | `/employees/:id` | Delete an employee          | `200`   |

**Create body**

```json
{
  "name": "Musa Abdullah",
  "email": "musa.abdullah@example.com",
  "phone": "+8801712345678",
  "password": "dummyPass123",
  "age": 23,
  "yearsOfWorking": 2
}
```

The password is hashed before saving and is not returned in responses.

### Info

| Method | Endpoint | Description                          |
|--------|----------|--------------------------------------|
| `GET`  | `/`      | Student details and endpoint list    |

## Validation and errors

| Situation                                   | Response              |
|---------------------------------------------|-----------------------|
| Missing / wrong-type field, negative price  | `400 Bad Request`     |
| Unknown field in the body                   | `400 Bad Request`     |
| Empty body on `PATCH`                       | `400 Bad Request`     |
| Non-numeric `:id` (e.g. `/products/abc`)    | `400 Bad Request`     |
| ID that does not exist                      | `404 Not Found`       |
| Employee email already used                 | `409 Conflict`        |

## Postman screenshots

All screenshots are in [`screenshots/`](./screenshots):

| File                     | Shows                                         |
|--------------------------|-----------------------------------------------|
| `01-create.png`          | POST body and the saved product response      |
| `02-get-all.png`         | GET all, with at least two products           |
| `03-get-by-id.png`       | GET one product by its real ID                |
| `04-update.png`          | PATCH body and successful response            |
| `05-confirm-update.png`  | GET by ID showing the changed values          |
| `06-delete.png`          | DELETE request and success response           |
| `07-confirm-delete.png`  | GET all showing the deleted product is absent |
