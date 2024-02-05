import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CausaJudicialModel } from "./causa-judicial.model";
import { DocumentoOrdenPrision } from "src/core/entities/documentos-ordenan-prision.entity";
import { IngresoAPrisionModel } from "./ingreso-a-prision.model";

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

  @ManyToOne(() => CausaJudicialModel)
  causa:CausaJudicialModel;

  @ManyToOne(() => IngresoAPrisionModel, (ingresoAPrision)=> ingresoAPrision.documento_que_ordenan_prision)
  ingreso_a_prision:IngresoAPrisionModel;

  @Column({type:'varchar'})
  ruta:string;
}

