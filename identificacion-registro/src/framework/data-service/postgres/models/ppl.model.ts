import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";
import { PersonaModel } from "./persona.model";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplEnExpedienteModel } from "./ppl-en-expediente.model";
import { RegistroFotoModel } from "./registro-foto.model";

@Entity({name:"ppl"})
export class PplModel extends Ppl{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() =>PersonaModel,{eager:true})
  @JoinColumn()
  persona:PersonaModel;

  @Column({type:"varchar", nullable:true})
  prontuario: string;

  @ManyToOne(() => EstablecimientoPenitenciarioModel,{eager:true})
  establecimiento_penitenciario:EstablecimientoPenitenciarioModel;

  @OneToMany(()=>PplEnExpedienteModel, pplEnExpediente=>pplEnExpediente.ppl)
  pplEnExpedientes:Array<PplEnExpedienteModel>;

  @OneToMany(()=>RegistroFotoModel, registro_foto=>registro_foto.ppl,{eager:true})
  registro_de_fotos:Array<RegistroFotoModel>;
} 