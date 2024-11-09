import { json, urlencoded } from 'express';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './framework/errors/http-exception-filter';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/registro/')
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Identifacil API')
    .setDescription('Identifacil API description')
    .setVersion('1.0')
    .addTag('identifacil')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_docs', app, documentFactory);

  
  await app.listen(4001);
}
bootstrap();
