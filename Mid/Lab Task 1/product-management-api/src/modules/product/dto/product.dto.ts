import { PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from "class-validator";

const trim = ({ value }: { value: unknown }) =>
  typeof value === "string" ? value.trim() : value;

export class CreateProductDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: "Product name is a mandatory field" })
  @MaxLength(120)
  name!: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: "Category is a mandatory field" })
  @MaxLength(80)
  category!: string;

  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: "Price must be a number with at most 2 decimal places" },
  )
  @Min(0, { message: "Price cannot be negative" })
  @Max(99_999_999.99)
  price!: number;

  @IsInt({ message: "Quantity must be a whole number" })
  @Min(0, { message: "Quantity cannot be negative" })
  quantity!: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
