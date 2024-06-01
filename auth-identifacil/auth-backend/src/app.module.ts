import { Module } from '@nestjs/common';
import { PostgresDataServiceModule } from './frameworks/data-services/postgres/postgres-data-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './use-cases/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:"localhost",
      port: 5432,
      username:'identifacil',
      password:'clave',
      logging:true,
      database:Number(process.env.PRODUCTION)===0 ? 'identifacil_auth' : 'identifacil_auth',
      migrations: ["src/migrations/*{.ts,.js}"],
      synchronize: true,
      autoLoadEntities:true,
    }),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn:'3600s'}
    }),
    PostgresDataServiceModule,
    AuthModule,
    

    
  ],
  providers: [
    
  ],
})
export class AppModule {}
