import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CiudadModel } from "./ciudad.model";
import { Compania } from "src/core/entities/compania.entity";

@Entity({name:"compania"})
export class CompaniaModel extends Compania{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({name:"varchar"})
  nombre:string;

  @ManyToOne(() => CiudadModel)
  ciudad:CiudadModel;
}