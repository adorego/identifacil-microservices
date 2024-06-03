import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.NATS,
  //   options: {
  //     servers:['nats://localhost:4222']
  //   }

  // })
  // await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
