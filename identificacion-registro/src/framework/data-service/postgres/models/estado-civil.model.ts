import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { EstadoCivil } from "src/core/entities/estado-civil.entity";

@Entity("estado_civil")
export class EstadoCivilModel extends EstadoCivil{

  

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  codigo:string;

  @Column({type:"varchar"})
  nombre:string;
}