import { GestionPPLUseCase } from "./gestion-ppl-use-case.service";
import { Module } from "@nestjs/common";
import { PostgresDataService } from "src/framework/data-service/postgres/postgres-data.service";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";

@Module({
  imports:[
    PostgresDataServiceModule
  ],
  providers:[
    GestionPPLUseCase
  ],
  exports:[
    GestionPPLUseCase
  ]
})
export class GestionPPLModule{}