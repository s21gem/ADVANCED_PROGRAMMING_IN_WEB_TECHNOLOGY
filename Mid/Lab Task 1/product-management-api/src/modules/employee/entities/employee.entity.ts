import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "employees" })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 120 })
  name: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email: string;

  @Column({ type: "varchar", length: 20 })
  phone: string;

  // Stored hashed and never sent back in API responses.
  @Exclude({ toPlainOnly: true })
  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "int" })
  age: number;

  @Column({ name: "years_of_working", type: "int", default: 0 })
  yearsOfWorking: number;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
