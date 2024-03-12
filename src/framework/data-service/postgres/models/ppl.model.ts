import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";
import { PersonaModel } from "./persona.model";
import { Ppl } from "src/core/entities/ppl.entity";
import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";
import { PplEnExpedienteModel } from "./ppl-en-expediente.model";
import { PplEnExpediente } from "src/core/entities/pplEnExpediente.entity";

@Entity({name:"ppl"})
export class PplModel extends Ppl{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() =>PersonaModel,{eager:true})
  @JoinColumn()
  persona:PersonaModel;

  @Column({type:"varchar", nullable:true})
  prontuario: string;

  @ManyToOne(() => EstablecimientoPenitenciarioModel, {cascade:true,eager:true})
  establecimiento_penitenciario:EstablecimientoPenitenciarioModel;

  @OneToMany(()=>PplEnExpedienteModel, pplEnExpediente=>pplEnExpediente.ppl)
  pplEnExpedientes:Array<PplEnExpedienteModel>;
} 