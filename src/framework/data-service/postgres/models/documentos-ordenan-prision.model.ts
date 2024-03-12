import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DocumentoOrdenPrision } from "src/core/entities/documentos-ordenan-prision.entity";
import { IngresoAPrisionModel } from "./ingreso-a-prision.model";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";

@Entity({name:'documentos_ordenan_prision'})
export class DocumentosOrdenanPrisionModel extends DocumentoOrdenPrision{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  numero_documento:string;

  @Column({type:'date', nullable:false})
  fecha:Date;

  @Column({type:'varchar'})
  tipo:string;

  @ManyToOne(() => ExpedienteJudicialModel)
  expediente:ExpedienteJudicialModel;

  @ManyToOne(() => IngresoAPrisionModel, (ingresoAPrision)=> ingresoAPrision.documentos_que_ordenan_prision)
  ingreso_a_prision:IngresoAPrisionModel;

  @Column({type:'varchar'})
  ruta:string;
}

