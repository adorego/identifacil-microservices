import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Barrio } from "src/core/entities/barrio.entity";

@Entity({name:"barrio"})
export class BarrioModel extends Barrio{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

}