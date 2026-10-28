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
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";
import { EmployeeService } from "./employee.service";

@Controller("employees")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // POST /employees
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateEmployeeDto) {
    return this.employeeService.create(dto);
  }

  // GET /employees
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  // GET /employees/:id
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }

  // PATCH /employees/:id
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(NonEmptyBodyPipe) dto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, dto);
  }

  // DELETE /employees/:id
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.employeeService.remove(id);
  }
}
