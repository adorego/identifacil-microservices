import { Column, PrimaryGeneratedColumn } from "typeorm";

import { Chofer } from "src/movimientos/core/entities/chofer.entity";

export class ChoferModel extends Chofer{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

  @Column({type:"varchar"})
  apellido:string;
  @Column({type:"varchar"})
  numeroDeIdentidad:string;

  @Column({type:"boolean"})
  activo:boolean;
}