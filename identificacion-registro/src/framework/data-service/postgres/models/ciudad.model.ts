import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Ciudad } from "src/core/entities/ciudad.entity";
import { PaisModel } from "./pais.model";

@Entity({name:"ciudad"})
export class CiudadModel extends Ciudad{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

  @ManyToOne(() => PaisModel)
  pais:PaisModel;
}