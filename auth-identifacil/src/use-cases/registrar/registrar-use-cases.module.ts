import { AuthController } from "src/controllers/auth.controller";
import { CriptoEncriptationServiceModule } from "src/frameworks/encriptation/encriptation-service.module";
import { DataServicesModule } from "src/services/data-services/data-services.module";
import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/frameworks/data-services/postgres/postgres-data-service.module";
import { RegistrarUseCases } from "./registrar.use-case";
import { UserFactoryService } from "./registrar-factory.service";

@Module({
  imports:[
    PostgresDataServiceModule,
    CriptoEncriptationServiceModule
    
  ],
  controllers:[
    AuthController
  ],
  providers:[
    UserFactoryService,
    RegistrarUseCases
  ],
  exports:[
    UserFactoryService,
    RegistrarUseCases
  ]
})


export class RegistrarUseCaseModule {}