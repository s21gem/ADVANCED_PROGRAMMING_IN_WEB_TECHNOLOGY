import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { NonEmptyBodyPipe } from "../../common/pipes/non-empty-body.pipe";
import { CreateProductDto, UpdateProductDto } from "./dto/product.dto";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // POST /products
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  // GET /products
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // GET /products/:id
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  // PATCH /products/:id
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(NonEmptyBodyPipe) dto: UpdateProductDto,
  ) {
    return this.productService.update(id, dto);
  }

  // DELETE /products/:id
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
