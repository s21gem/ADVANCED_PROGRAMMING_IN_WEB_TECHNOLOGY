import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET /  -> API info and endpoint list
  @Get()
  getInfo() {
    return this.appService.getInfo();
  }
}
