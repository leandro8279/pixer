import { HttpExceptionFilter } from '@/common/filters/HttpExceptionFilter';
import { LoggingInterceptor } from '@/common/interceptors/LoggingInterceptor';
import { TimeoutInterceptor } from '@/common/interceptors/TimeoutInterceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from "@/config/SwaggerConfig";

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Validação e transformação de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Filtro global: formata todas as exceções em JSON consistente
  app.useGlobalFilters(new HttpExceptionFilter());

  // Interceptors globais: logging de requests + timeout de 30s
  app.useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor(30_000));
  setupSwagger(app);
  await app.listen(process.env.BACKEND_PORT ?? 3001);
}
bootstrap();
