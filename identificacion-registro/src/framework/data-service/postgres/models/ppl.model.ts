import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";
import { PersonaModel } from "./persona.model";
import { Ppl } from "src/core/entities/ppl.entity";

@Entity({name:"ppl"})
export class PplModel extends Ppl{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() =>PersonaModel,{eager:true})
  @JoinColumn()
  persona:PersonaModel;

  @OneToOne(() => EstablecimientoPenitenciarioModel, {eager:true})
  @JoinColumn()
  establecimiento_penitenciario:EstablecimientoPenitenciarioModel;
} 