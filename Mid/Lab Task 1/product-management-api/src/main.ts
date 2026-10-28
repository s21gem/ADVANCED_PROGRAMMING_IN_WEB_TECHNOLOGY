import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DatabaseExceptionFilter } from "./common/filters/database-exception.filter";
import { AppConfig } from "./config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Needed for @Exclude() on Employee.password.
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalFilters(new DatabaseExceptionFilter());

  const { port } = app.get(ConfigService).getOrThrow<AppConfig>("app");
  await app.listen(port);

  Logger.log(`Server running at http://localhost:${port}`, "Bootstrap");
}

void bootstrap();
