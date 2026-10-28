import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { appConfig, databaseConfig } from "./config";
import { EmployeeModule } from "./modules/employee/employee.module";
import { ProductModule } from "./modules/product/product.module";
import { PostgresDatabaseProviderModule } from "./providers/database/postgres/provider.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    PostgresDatabaseProviderModule,
    ProductModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
