import { ConfigModule } from '@nestjs/config';
import { IdentificacionUseCaseModule } from './use-cases/identificacion-use-case.module';
import { Module } from '@nestjs/common';
import { PostgresDataServiceModule } from './framework/data-service/postgres/postgres-data-service.module';
import { RegistroIdentificacionModule } from './framework/identificacion-registro.module';
import { RegistroUseCasesModule } from './use-cases/registro-use-case.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      // host:"registro-postgres-srv",
      host:process.env.TEST_DB_HOST,
      port: 5432,
      username:'identifacil',
      password:'clave',
      logging:true,
      database:'identifacil_registro',
      migrations: ["src/migrations/*{.ts,.js}"],
      synchronize: true,
      autoLoadEntities:true,
    }),
    ConfigModule.forRoot(),
    
    RegistroIdentificacionModule,
    PostgresDataServiceModule,
    RegistroUseCasesModule,
    IdentificacionUseCaseModule
  
  ],
  controllers: [],
  providers: [],
  exports:[
    PostgresDataServiceModule
  ]
})
export class AppModule {}
