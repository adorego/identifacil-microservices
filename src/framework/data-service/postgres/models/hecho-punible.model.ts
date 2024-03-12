import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { HechoPunible } from "src/core/entities/hecho_punible.entity";
import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { CausaJudicialModel } from "./causa-judicial.model";
import { HechoPunibleCausaJudicialModel } from "./hecho-punible-causa-judicial.model";

@Entity({name:'hecho_punible'})
export class HechoPunibleModel extends HechoPunible{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  nombre:string;

  @Column({type:'varchar', nullable:false, unique:true})
  codigo:string;

  @OneToMany(()=>CausaJudicialModel, causa =>causa.hecho_punible,{eager:true})
  causas:Array<CausaJudicialModel>

  @ManyToMany(()=>HechoPunibleCausaJudicialModel, hechoPunibleCausas=>hechoPunibleCausas.hecho_punible)
  hechosPuniblesCausas:Array<HechoPunibleCausaJudicialModel>;
}