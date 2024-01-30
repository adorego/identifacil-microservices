import { json, urlencoded } from 'express';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './framework/errors/http-exception-filter';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/registro/')
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.listen(4001);
}
bootstrap();
