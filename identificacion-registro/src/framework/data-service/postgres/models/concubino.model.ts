import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Concubino } from "src/core/entities/concubino.entity";
import { PersonaModel } from "./persona.model";

@Entity({name:'concubino'})
export class ConcubinoModel extends Concubino{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  numero_identificacion:string;

  @Column({type:'varchar', nullable:false})
  nombres:string;

  @Column({type:'varchar', nullable:false})
  apellidos:string;

  @Column({type:'date', nullable:false})
  fecha_inicio:Date;

  @Column({type:'date'})
  fecha_baja:Date;

  @OneToOne(() => PersonaModel)
  @JoinColumn()
  persona:PersonaModel;
}