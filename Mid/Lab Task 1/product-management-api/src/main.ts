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

  // Validate every request body against its DTO and drop unknown fields.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Applies @Exclude() rules (e.g. hides employee passwords).
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Maps database errors (duplicate email, etc.) to proper HTTP codes.
  app.useGlobalFilters(new DatabaseExceptionFilter());

  const { port } = app.get(ConfigService).getOrThrow<AppConfig>("app");
  await app.listen(port);

  Logger.log(`Server running at http://localhost:${port}`, "Bootstrap");
}

void bootstrap();
