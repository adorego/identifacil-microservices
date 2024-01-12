import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { RegistroDatosPersonalesFactory } from "./registro-datosPersonales-factory.service";
import { RegistroFactory } from "./registro-factory.services";
import { RegistroSaludFactory } from "./registro-salud-factory.service";
import { RegistroUseCase } from "./registro-use-case.service";

@Module({
  imports:[
    PostgresDataServiceModule
  ],
  providers:[
    RegistroUseCase,
    RegistroFactory,
    RegistroSaludFactory,
    RegistroDatosPersonalesFactory,
  
  ],
  controllers:[],
  exports:[
    RegistroUseCase,
    RegistroFactory,
    RegistroSaludFactory,
    RegistroDatosPersonalesFactory,
  ]
})
export class RegistroUseCasesModule{}