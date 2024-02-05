import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DatosFamiliaresModel } from "./datos-familiares.model";
import { Hijo } from "src/core/entities/hijo-persona.entity";

@Entity({name:'hijo'})
export class HijoPersonaModel extends Hijo{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  nombre:string;

  @Column({type:'int', nullable:false})
  edad:number;

  @Column({type:'varchar', nullable:false})
  lugar_sistema_penitenciario:string;

  

  
}