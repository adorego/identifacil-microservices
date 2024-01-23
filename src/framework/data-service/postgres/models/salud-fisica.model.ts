import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { PersonaModel } from "./persona.model";
import { SaludFisica } from "src/core/entities/salud-fisica.entity";

@Entity({name:'salud_fisica'})
export class SaludFisicaModel extends SaludFisica{
  @PrimaryGeneratedColumn()
  id:number;
  
  @OneToOne(() => PersonaModel, persona => persona.salud_fisica)
  persona:PersonaModel;

  @Column({type:'varchar', nullable:true})
  discapacidad_fisica:string;

  @Column({type:'boolean', nullable:false})
  discapacidad_modificada:boolean;

}