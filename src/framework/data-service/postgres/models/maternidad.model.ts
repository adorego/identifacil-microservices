import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Maternidad } from "src/core/entities/maternidad.entity";
import { PersonaModel } from "./persona.model";

@Entity({name:'maternidad'})
export class MaternidadModel extends Maternidad{
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({type:'int'})
  meses_gestacion:number;

  @Column({type:'date'})
  fecha_parto:Date;

  @OneToOne(() => PersonaModel)
  @JoinColumn()
  persona:PersonaModel
}