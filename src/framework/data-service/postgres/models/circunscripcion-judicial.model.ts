import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { CircunscripcionJudicial } from "src/core/entities/circunscripcion-judicial.entity";

@Entity({name:"circunscripcion_judicial"})
export class CircunscripcionJudicialModel extends CircunscripcionJudicial{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  nombre:string;
}