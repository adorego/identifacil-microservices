import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { EducacionFormacion } from "src/core/entities/educacion-formacion.entity";
import { Persona } from "src/core/entities/persona.entity";
import { PersonaModel } from "./persona.model";

@Entity({name:'educacion_formacion'})
export class EducacionFormacionModel extends EducacionFormacion{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => PersonaModel, (persona) => persona.educacionFormacion)
  persona: PersonaModel;

  @Column({type:'varchar'})
  nivelAcademico:string;

  @Column({type:'boolean'})
  nivelAcademico_modificado:boolean;

  @Column({type:'varchar'})
  institucionEducativa:string;

  @Column({type:'boolean'})
  institucionEducativa_modificado:boolean;

  @Column({type:'boolean'})
  tieneOficio:boolean;

  @Column({type:'boolean'})
  tieneOficio_modificado:boolean;

  @Column({type:'varchar'})
  nombreOficio:string;

  @Column({type:'boolean'})
  nombreOficio_modificado:boolean;

  @Column({type:'varchar'})
  ultimoTrabajo:string;

  @Column({type:'boolean'})
  ultimoTrabajo_modificado:boolean;
 
}