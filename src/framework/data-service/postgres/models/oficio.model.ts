import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Oficio } from "src/core/entities/oficio.entity";

@Entity({name:"oficio"})
export class OficioModel extends Oficio{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;
}