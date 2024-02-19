import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CausaJudicialModel } from "./causa-judicial.model";
import { DocumentosOrdenanPrisionModel } from "./documentos-ordenan-prision.model";
import { HechoPunibleModel } from "./hecho-punible.model";
import { PersonaModel } from "./persona.model";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";

@Entity({name:'situacion_judicial'})
export class SituacionJudicialModel extends SituacionJudicial{

  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => PersonaModel)
  persona:PersonaModel;

  @Column({type:'boolean', nullable:false})
  condenado:boolean;

  @Column({type:'boolean', nullable:false})
  primera_vez_en_prision:boolean;

  @Column({type:'int', nullable:false})
  cantidad_de_veces_que_ingreso:number;

   
}