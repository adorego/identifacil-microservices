import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { PersonaModel } from "./persona.model";
import { TipoIdentificacion } from "src/core/entities/tipo-identificacion.entity";

@Entity({name:'tipo_identificacion'})
export class TipoIdentificacionModel extends TipoIdentificacion{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar'})
  tipo:string;

  
}
