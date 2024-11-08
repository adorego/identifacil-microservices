import { ConfigModule } from '@nestjs/config';
import { DatosPenalesModule } from './use-cases/datos-penales/datos-penales.module';
import { GestionPPLModule } from './use-cases/gestion-ppl/getion-ppl.module';
import { IdentificacionUseCaseModule } from './use-cases/identificacion/identificacion-use-case.module';
import { LibModule } from './framework/lib/lib.modules';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { PostgresDataServiceModule } from './framework/data-service/postgres/postgres-data-service.module';
import { RegistroIdentificacionModule } from './framework/identificacion-registro.module';
import { RegistroUseCasesModule } from './use-cases/registro-use-case.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MovimientosModule } from './use-cases/movimientos/movimientos.module';
import { EntradaSalidaPPLModule } from './use-cases/entrada-salida/entrada-salida.module';
import { ConyugeModule } from './use-cases/conyuge/conyuge.module';
import { MedidaDeFuerzaModule } from './use-cases/medidas-de-fuerza/medidas-de-fuerza.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './use-cases/security/auth.module';
import { FaltasSancionesModule } from './use-cases/faltas-y-sanciones/faltas-y-sanciones.module';
import { DefensoresModule } from './use-cases/defensores/defensores.module';





@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.register({
      limits:{
        fileSize: 1024 * 1024 * 1000,
      },
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:Number(process.env.PRODUCTION)===0 ? process.env.TEST_DB_HOST : "registro-postgres-srv",
      port: 5432,
      username:'identifacil',
      password:'clave',
      logging:true,
      database:Number(process.env.PRODUCTION)===0 ? 'identifacil_registro' : 'identifacil-registro',
      migrations: ["src/migrations/*{.ts,.js}"],
      synchronize: true,
      autoLoadEntities:true,
    }),
    ServeStaticModule.forRoot({
      rootPath: Number(process.env.PRODUCTION)===1 ? process.env.FILE_STORAGE_PROD : join(__dirname,'..','public'),
      serveRoot:"/archivos"
    }),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn:'3600s'}
    }),
    
    RegistroIdentificacionModule,
    PostgresDataServiceModule,
    RegistroUseCasesModule,
    IdentificacionUseCaseModule,
    LibModule,
    GestionPPLModule,
    DatosPenalesModule,
    MovimientosModule,
    EntradaSalidaPPLModule,
    ConyugeModule,
    MedidaDeFuerzaModule,
    AuthModule,
    FaltasSancionesModule,
    DefensoresModule,
  
  ],
  controllers: [],
  providers: [],
  exports:[
    //PostgresDataServiceModule
  ]
})
export class AppModule {}
