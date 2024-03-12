import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CircunscripcionJudicialModel } from "./circunscripcion-judicial.model";
import { DespachoJudicial } from "src/core/entities/despacho-judicial.entity";

@Entity({name:"despachos_judiciales"})
export class DespachoJudicialModel extends DespachoJudicial{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"varchar"})
  descripcion:string;

  @Column({type:"varchar"})
  codigo:string;

  @ManyToOne(() => CircunscripcionJudicialModel)
  circunscripcion_judicial:CircunscripcionJudicialModel;
}