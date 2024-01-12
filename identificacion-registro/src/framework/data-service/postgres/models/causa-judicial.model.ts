import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Causa } from "src/core/entities/causa-judicial.entity";
import { DocumentosOrdenanprisionModel } from "./documentos-ordenan-prision.model";
import { SituacionJudicialModel } from "./situacion-judicial.model";

@Entity({name:'causa_judicial'})
export class CausaJudicialModel extends Causa{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  caratula_causa:string;

  @OneToMany(() => DocumentosOrdenanprisionModel, (documentos) => documentos.causa)
  documentos_ordenan_prision:DocumentosOrdenanprisionModel
}