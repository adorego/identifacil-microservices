import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { Condena } from "src/core/entities/condena.entity";
import { CondenaModel } from "./condena.model";
import { DespachosJudicialesModel } from "./despachos-judiciales.model";
import { HechoPunible } from "src/core/entities/hecho_punible.entity";
import { HechoPunibleModel } from "./hecho-punible.model";
import { Persona } from "src/core/entities/persona.entity";
import { PersonaModel } from "./persona.model";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";
import { SituacionJudicialModel } from "./situacion-judicial.model";

@Entity({name:'causa_judicial'})
export class CausaJudicialModel extends CausaJudicial{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:"int", nullable:false})
  numero_expediente:number;

  @Column({type:"int", nullable:false})
  anho:number;
  
  @Column({type:"boolean", default:false})
  condenado:boolean;

  @ManyToMany(() =>PersonaModel)
  @JoinTable()
  persona:PersonaModel;

  @Column({type:'varchar', nullable:false})
  caratula_causa:string;

  @Column({type:"varchar"})
  juzgado:string;

  @ManyToMany(() => HechoPunibleModel)
  @JoinTable()
  hecho_punible: HechoPunibleModel;

  @OneToOne(() => CondenaModel)
  @JoinColumn()
  condena: CondenaModel;

  @ManyToOne(() => DespachosJudicialesModel)
  despacho_judicial:DespachosJudicialesModel;

  @ManyToOne(() => SituacionJudicialModel, situacionJudicial => situacionJudicial.causas)
  situacionJudicial:SituacionJudicialModel;
}

