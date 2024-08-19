import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { VinculoFamiliar } from "src/core/entities/vinculo-familiar.entity"

@Entity({name:"vinculo_familiar"})
export class VinculoFamiliarModel extends VinculoFamiliar{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

 
}