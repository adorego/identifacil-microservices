import { EstadoDeMovimientoModel } from "./model/estado-movimiento.model";
import { IMovimientosDataService } from "src/movimientos/core/abstract/movimientos-data.service";
import { Module } from "@nestjs/common";
import { MovimientoModel } from "./model/movimiento.model";
import { PostgresMovimientosDataService } from "./postgres-data-service";
import { TipoMovimientosModel } from "./model/tipo-movimiento.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports:[
    TypeOrmModule.forFeature([
      MovimientoModel,
      EstadoDeMovimientoModel,
      TipoMovimientosModel 
  ])],
  providers:[
    {
      provide: IMovimientosDataService,
      useClass: PostgresMovimientosDataService
    },
    
    
  ],
  exports:[
    IMovimientosDataService
    
  ]
})
export class PostgresMovimientosModule{}