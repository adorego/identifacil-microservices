import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { CausaJudicialModel } from "./causa-judicial.model";
import { DocumentosOrdenanPrisionModel } from "./documentos-ordenan-prision.model";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";
import { IngresoAPrision } from "src/core/entities/ingreso-a-prision.entity";
import { SituacionJudicialModel } from "./situacion-judicial.model";

@Entity({name:"ingreso_a_prision"})
export class IngresoAPrisionModel extends IngresoAPrision{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => CausaJudicialModel)
  @JoinColumn()
  causa:CausaJudicialModel;

  @OneToMany(() => DocumentosOrdenanPrisionModel, documentoOrdenanPrision => documentoOrdenanPrision.ingreso_a_prision)
  documento_que_ordenan_prision:Array<DocumentosOrdenanPrisionModel>;

  @Column({type:"date"})
  fecha_ingreso:Date;

  @Column({type:"date"})
  fecha_de_salida:Date;

  @OneToOne(() => EstablecimientoPenitenciarioModel)
  @JoinColumn()
  establecimiento_penitenciario:EstablecimientoPenitenciarioModel;

  @OneToMany(()=>SituacionJudicialModel, situacionJudicial=>situacionJudicial.ingresos_a_prision)
  situacionJudicial:SituacionJudicialModel
}