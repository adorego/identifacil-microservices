import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/consultaci/')
  app.enableCors();
  await app.listen(4003);
}
bootstrap();
