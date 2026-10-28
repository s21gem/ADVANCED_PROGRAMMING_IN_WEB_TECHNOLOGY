import { PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

const trim = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() : value;

const trimLower = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim().toLowerCase() : value;

export class CreateEmployeeDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: "Name is a mandatory field" })
  @MaxLength(120)
  name!: string;

  @Transform(trimLower)
  @IsEmail({}, { message: "Email must be a valid email address" })
  @MaxLength(150)
  email!: string;

  // Accepts formats like 01712345678, +8801712345678, 017-1234-5678
  @Transform(trim)
  @IsString()
  @Matches(/^\+?[0-9][0-9\s-]{6,18}$/, {
    message:
      "Phone must be a valid phone number (digits, spaces, dashes, optional leading +)",
  })
  phone!: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @MaxLength(64)
  password!: string;

  @IsInt({ message: "Age must be a whole number" })
  @Min(18, { message: "Employee must be at least 18 years old" })
  @Max(100)
  age!: number;

  @IsInt({ message: "Years of working must be a whole number" })
  @Min(0, { message: "Years of working cannot be negative" })
  @Max(80)
  yearsOfWorking!: number;
}

// Every field from CreateEmployeeDto, all optional, same validation rules.
export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
