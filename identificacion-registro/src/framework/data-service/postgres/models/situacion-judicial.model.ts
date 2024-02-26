import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CausaJudicialModel } from "./causa-judicial.model";
import { DocumentosOrdenanPrisionModel } from "./documentos-ordenan-prision.model";
import { HechoPunibleModel } from "./hecho-punible.model";
import { PersonaModel } from "./persona.model";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";
import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { IngresoAPrisionModel } from "./ingreso-a-prision.model";

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

  @Column({type:'varchar', nullable:false})
  expediente_numero_de_documento:string;

  @Column({type:'date', nullable:false})
  expediente_fecha_de_documento:Date;

  @OneToMany(()=>IngresoAPrisionModel, ingresoAPrision=>ingresoAPrision.situacionJudicial)
  ingresos_a_prision:Array<IngresoAPrisionModel>;
}