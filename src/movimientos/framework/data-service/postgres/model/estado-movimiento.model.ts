import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { EstadoDeMovimiento } from "src/movimientos/core/entities/estado-movimiento.entity";
import { MovimientoModel } from "./movimiento.model";

@Entity({name:"estado_movimiento"})
export class EstadoDeMovimientoModel extends EstadoDeMovimiento{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  estado:string;

  @ManyToOne(() => MovimientoModel, movimiento => movimiento.estado)
  movimiento:MovimientoModel;
}