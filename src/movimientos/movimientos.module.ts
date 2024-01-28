import { AbmMovimientosUseCase } from "./use-cases/abm-movimientos";
import { Module } from "@nestjs/common";
import { MovimientosController } from "./framework/movimientos.controller";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";

@Module({
  imports:[
    PostgresDataServiceModule
  ],
  providers:[
    AbmMovimientosUseCase,
  ],
  controllers:[
    MovimientosController
  ]
})
export class MovimientosModule{}