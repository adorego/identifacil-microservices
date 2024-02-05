import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { EstadoDeMovimientoModel } from "./estado-movimiento.model";
import { Movimiento } from "src/movimientos/core/entities/movimiento.entity";
import { PersonaModel } from "src/framework/data-service/postgres/models/persona.model";
import { TipoMovimientosModel } from "./tipo-movimiento.model";

@Entity('movimiento')
export class MovimientoModel extends Movimiento{
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({type:"date", nullable:false})
  salidaFecha:Date;

  @Column({type:"date", nullable:false})
  salidaHora:Date;

  @Column({type:"date", nullable:false})
  entradaFecha:Date;

  @Column({type:"date", nullable:false})
  entradaHora:Date;

  @OneToMany(() => EstadoDeMovimientoModel, (estado) => estado.movimiento)
  estado:EstadoDeMovimientoModel;

  @ManyToOne(() => TipoMovimientosModel)
  tipo_movimiento:TipoMovimientosModel;

  @ManyToOne(() => PersonaModel)
  persona:PersonaModel;

}