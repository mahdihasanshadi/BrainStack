import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { Configuration } from "./config/configuration";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService<Configuration, true>);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: configService.get("app.frontendUrl", { infer: true }),
    credentials: true,
  });

  const port = configService.get("app.port", { infer: true });
  await app.listen(port);
}

bootstrap();
