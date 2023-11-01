import { Module } from '@nestjs/common';
import { PostgresDataServiceModule } from './framework/data-service/postgres/postgres-data-service.module';
import { RegistroIdentificacionModule } from './framework/identificacion-registro.module';
import { RegistroUseCasesModule } from './use-cases/registro-use-case.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:"registro-postgres-srv",
      port: 5432,
      username: 'identifacil',
      password:'clave',
      database:'identifacil-registro',
      synchronize: true,
      autoLoadEntities:true,
    }),
    
    RegistroIdentificacionModule,
    PostgresDataServiceModule,
    RegistroUseCasesModule
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
