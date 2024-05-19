import { AuthController } from './controllers/auth.controller';
import { CriptoEncriptationServiceModule } from './frameworks/encriptation/encriptation-service.module';
import { Module } from '@nestjs/common';
import { PostgresDataServiceModule } from './frameworks/data-services/postgres/postgres-data-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:Number(process.env.PRODUCTION)===0 ? process.env.TEST_DB_HOST : "auth-postgres-srv",
      port: 5432,
      username:'identifacil',
      password:'clave',
      logging:true,
      database:Number(process.env.PRODUCTION)===0 ? 'identifacil_auth' : 'identifacil_auth',
      migrations: ["src/migrations/*{.ts,.js}"],
      synchronize: true,
      autoLoadEntities:true,
    }),
    PostgresDataServiceModule,

    
  ],
  controllers: [
    AuthController
  ],
  providers: [],
})
export class AppModule {}
