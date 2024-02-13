import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({type:"varchar", nullable:true})
  prontuario: string;

  @ManyToOne(() => EstablecimientoPenitenciarioModel, {cascade:true,eager:true})
  establecimiento_penitenciario:EstablecimientoPenitenciarioModel;
} 