import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Pais } from "src/core/entities/pais.entity";

@Entity("pais")
export class PaisModel extends Pais{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

  @Column({type:"varchar"})
  codigo: string;
}