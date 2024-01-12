import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CausaJudicialModel } from "./causa-judicial.model";
import { DocumentoOrdenPrision } from "src/core/entities/documentos-ordenan-prision.entity";

@Entity({name:'documentos_ordenan_prision'})
export class DocumentosOrdenanprisionModel extends DocumentoOrdenPrision{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  numero_documento:string;

  @Column({type:'date', nullable:false})
  fecha:Date;

  @Column({type:'varchar'})
  tipo:string;

  @ManyToOne(() => CausaJudicialModel, (causa) => causa.documentos_ordenan_prision)
  causa:CausaJudicialModel;
}