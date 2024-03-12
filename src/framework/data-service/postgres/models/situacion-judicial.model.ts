import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { DocumentosOrdenanPrisionModel } from "./documentos-ordenan-prision.model";
import { HechoPunibleModel } from "./hecho-punible.model";
import { PersonaModel } from "./persona.model";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";
import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { IngresoAPrisionModel } from "./ingreso-a-prision.model";
import { HechoPunible } from "src/core/entities/hecho_punible.entity";

@Entity({name:'situacion_judicial'})
export class SituacionJudicialModel extends SituacionJudicial{

  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => PersonaModel)
  persona:PersonaModel;

  @Column({type:'boolean', nullable:false})
  primera_vez_en_prision:boolean;

  @Column({type:'int', nullable:false})
  cantidad_de_veces_que_ingreso:number;

  

  @OneToMany(()=>IngresoAPrisionModel, ingresoAPrision=>ingresoAPrision.situacionJudicial,{eager:true})
  ingresos_a_prision:Array<IngresoAPrisionModel>;

  @Column({type:'varchar', nullable:true})
  caratula:string;

  @Column({type:'varchar', nullable:true})
  sentencia_definitiva:string;

  
}