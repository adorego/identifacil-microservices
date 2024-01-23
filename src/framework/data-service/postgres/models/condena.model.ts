import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CausaJudicialModel } from "./causa-judicial.model";
import { Condena } from "src/core/entities/condena.entity";

@Entity({name:"condena"})
export class CondenaModel extends Condena{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => CausaJudicialModel, causaJudicial => causaJudicial.condena)
  causa:CausaJudicialModel;

  @Column({type:"int"})
  anhos:number;
}