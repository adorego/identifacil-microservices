import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Nacionalidad } from "src/core/entities/nacionalidad";
import { PaisModel } from "./pais.model";

@Entity({name:'nacionalidad'})
export class NacionalidadModel extends Nacionalidad{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  nombre:string;

  @Column({type:'varchar', nullable:false})
  pais:PaisModel;


}