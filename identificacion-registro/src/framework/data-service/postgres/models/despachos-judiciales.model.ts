import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CircunscripcionJudicialModel } from "./circunscripcion-judicial.model";
import { DespachosJudiciales } from "src/core/entities/despachos-judiciales.entity";

@Entity({name:"despachos_judiciales"})
export class DespachosJudicialesModel extends DespachosJudiciales{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  descripcion:string;

  @ManyToOne(() => CircunscripcionJudicialModel)
  circunscripcion_judicial:CircunscripcionJudicialModel;
}