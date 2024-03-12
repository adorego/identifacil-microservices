import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { DocumentosOrdenanPrisionModel } from "./documentos-ordenan-prision.model";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";
import { IngresoAPrision } from "src/core/entities/ingreso-a-prision.entity";
import { SituacionJudicialModel } from "./situacion-judicial.model";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";

@Entity({name:"ingreso_a_prision"})
export class IngresoAPrisionModel extends IngresoAPrision{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => ExpedienteJudicialModel)
  @JoinColumn()
  expedienteJudicial:ExpedienteJudicialModel;

  @OneToMany(() => DocumentosOrdenanPrisionModel, documentoOrdenanPrision => documentoOrdenanPrision.ingreso_a_prision,{eager:true})
  documentos_que_ordenan_prision:Array<DocumentosOrdenanPrisionModel>;

  @Column({type:"date"})
  fecha_ingreso:Date;

  @Column({type:"date", nullable:true})
  fecha_de_salida:Date;

  @ManyToOne(() => EstablecimientoPenitenciarioModel, establecimientoPenitenciario =>establecimientoPenitenciario.ingresos_a_prision)
  establecimiento_penitenciario:EstablecimientoPenitenciarioModel;

  @ManyToOne(()=>SituacionJudicialModel, situacionJudicial=>situacionJudicial.ingresos_a_prision)
  situacionJudicial:SituacionJudicialModel
}