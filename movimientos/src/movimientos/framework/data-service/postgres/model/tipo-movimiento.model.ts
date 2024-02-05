import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { TipoDeMovimientos } from "src/movimientos/core/entities/tipo-movimiento.entity";

@Entity({name:"tipo_movimientos"})
export class TipoMovimientosModel extends TipoDeMovimientos{
  @PrimaryGeneratedColumn()
  id:number;


  @Column({type:"varchar"})
  nombre:string;

}