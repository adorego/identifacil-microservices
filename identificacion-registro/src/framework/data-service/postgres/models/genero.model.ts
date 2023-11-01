import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Genero } from "src/core/entities/genero.entity";
import { PersonaModel } from "./persona.model";

@Entity({name:'genero'})
export class GeneroModel extends Genero{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  genero:string;

  @OneToMany((type) => PersonaModel, (persona) => persona.genero)
  personas:PersonaModel[];
}