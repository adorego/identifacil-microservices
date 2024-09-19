import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CircunscripcionJudicial } from "src/core/entities/circunscripcion-judicial.entity";
import { IntervencionDefensorModel } from "./intervencion-defensor.model";

@Entity({name:"circunscripcion_judicial"})
export class CircunscripcionJudicialModel extends CircunscripcionJudicial{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;

  
}