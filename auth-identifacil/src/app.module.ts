import { AuthController } from './controllers/auth.controller';
import { CriptoEncriptationServiceModule } from './frameworks/encriptation/encriptation-service.module';
import { Module } from '@nestjs/common';
import { PostgresDataServiceModule } from './frameworks/data-services/postgres/postgres-data-service.module';
import { RegistrarUseCaseModule } from './use-cases/registrar/registrar-use-cases.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:"auth-postgres-srv",
      port: 5432,
      username: 'identifacil',
      password:'clave',
      database:'identifacil-auth',
      synchronize: true,
      autoLoadEntities:true,
    }),
    PostgresDataServiceModule,
    RegistrarUseCaseModule,
    // CriptoEncriptationServiceModule

    
  ],
  controllers: [
    AuthController
  ],
  providers: [],
})
export class AppModule {}
