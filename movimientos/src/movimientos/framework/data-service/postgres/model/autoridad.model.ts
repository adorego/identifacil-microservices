import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Autoridad } from "src/movimientos/core/entities/autoridad.entity";

@Entity({name:"autoridad"})
export class AutoridadModel extends Autoridad{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

  @Column({type:"varchar"})
  apellido:string;

  @Column({type:"boolean"})
  activo:boolean;
}