import { IdentificacionUseCase } from "./identificacion-use-case.service";
import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";

@Module({
  imports:[
    PostgresDataServiceModule
  ],
  providers:[
    IdentificacionUseCase
  ],
  exports:[
    IdentificacionUseCase
  ]
})
export class IdentificacionUseCaseModule{}