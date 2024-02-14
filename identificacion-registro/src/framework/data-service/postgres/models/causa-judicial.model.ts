import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { CircunscripcionJudicialModel } from "./circunscripcion-judicial.model";
import { CiudadModel } from "./ciudad.model";
import { CondenaModel } from "./condena.model";
import { DespachoJudicialModel } from "./despachos-judiciales.model";
import { HechoPunibleModel } from "./hecho-punible.model";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplModel } from "./ppl.model";
import { SituacionJudicialModel } from "./situacion-judicial.model";

@Entity({name:'causa_judicial'})
export class CausaJudicialModel extends CausaJudicial{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"int", nullable:true})
  numeroDeExpediente:number;

  @Column({type:"int", nullable:true})
  numeroDeDocumento:number;

  @Column({type:"int", nullable:false})
  anho:number;

  @Column({type:"varchar",nullable:true})
  condenado:boolean
  
  @Column({type:"varchar", nullable:true})
  estado_procesal:string;

  @ManyToMany(() =>PplModel)
  @JoinTable()
  ppls:Array<PplModel>;

  @Column({type:'varchar', nullable:false})
  caratula_causa:string;

  @ManyToOne(()=>DespachoJudicialModel,{eager:true})
  despacho_judicial:DespachoJudicialModel;

  @ManyToMany(() => HechoPunibleModel)
  @JoinTable()
  hechos_punibles: Array<HechoPunibleModel>;

  @OneToOne(() => CondenaModel)
  @JoinColumn()
  condena: CondenaModel;

  @ManyToOne(()=>CircunscripcionJudicialModel)
  circunscripcion: CircunscripcionJudicialModel;

  @ManyToOne(()=>CiudadModel)
  ciudad: CiudadModel;

  @ManyToOne(() => SituacionJudicialModel, situacionJudicial => situacionJudicial.causas)
  situacionJudicial:SituacionJudicialModel;
}

