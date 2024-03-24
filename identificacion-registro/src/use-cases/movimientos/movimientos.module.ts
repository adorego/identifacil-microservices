import { Module } from "@nestjs/common";
import { PostgresDataServiceModule } from "src/framework/data-service/postgres/postgres-data-service.module";
import { MovimientosFactory } from "./movimientos-factory.service";
import { MovimientosUseCases } from "./movimientos-use-cases.service";
import { MovimientosController } from "src/framework/controllers/movimientos.controller";


@Module({
    imports:[
      PostgresDataServiceModule
    ],
    providers:[
      MovimientosFactory,
      MovimientosUseCases
    ],
    controllers:[
        MovimientosController
    ]
   
  })
  export class MovimientosModule{}