import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { hashPassword } from "../../common/helpers/password.helper";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";
import { Employee } from "./entities/employee.entity";

/**
 * All database work for employees lives here; the controller only
 * handles HTTP concerns.
 */
@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto): Promise<Employee> {
    this.assertExperienceFitsAge(dto.age, dto.yearsOfWorking);
    const employee = this.employeeRepository.create({
      ...dto,
      password: await hashPassword(dto.password),
    });
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ order: { id: "ASC" } });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);
    this.assertExperienceFitsAge(
      dto.age ?? employee.age,
      dto.yearsOfWorking ?? employee.yearsOfWorking,
    );

    const changes: Partial<Employee> = { ...dto };
    if (dto.password) {
      changes.password = await hashPassword(dto.password);
    }

    this.employeeRepository.merge(employee, changes);
    return this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<{ message: string; id: number }> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
    return { message: `Employee with ID ${id} deleted successfully`, id };
  }

  // Nobody can have more years of work than years since turning 14.
  private assertExperienceFitsAge(age: number, yearsOfWorking: number): void {
    const maxYears = age - 14;
    if (yearsOfWorking > maxYears) {
      throw new BadRequestException(
        `yearsOfWorking (${yearsOfWorking}) is not realistic for age ${age}; maximum is ${maxYears}`,
      );
    }
  }
}
