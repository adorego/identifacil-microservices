import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { RegistroFactory } from "./registro-factory.services";
import { RegistroUseCase } from "./registro-use-case.service";

@Module({
  imports:[
    PostgresDataServiceModule
  ],
  providers:[
    RegistroUseCase,
    RegistroFactory
  
  ],
  controllers:[],
  exports:[
    RegistroUseCase,
    RegistroFactory
  ]
})
export class RegistroUseCasesModule{}