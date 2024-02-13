import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { PersonaModel } from "./persona.model";
import { SaludFisica } from "src/core/entities/salud-fisica.entity";

@Entity({name:'salud_fisica'})
export class SaludFisicaModel extends SaludFisica{
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({type:'varchar', nullable:true})
  discapacidad_fisica:string;

  @Column({type:'boolean', nullable:false})
  discapacidad_modificada:boolean;

}