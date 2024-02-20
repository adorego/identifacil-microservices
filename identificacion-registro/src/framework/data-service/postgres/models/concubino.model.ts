import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Concubino } from "src/core/entities/concubino.entity";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { DatosFamiliaresModel } from "./datos-familiares.model";
import { PersonaModel } from "./persona.model";

@Entity({name:'concubino'})
export class ConcubinoModel extends Concubino{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  numeroDeIdentificacion:string;

  @Column({type:'varchar', nullable:false})
  nombres:string;

  @Column({type:'varchar', nullable:false})
  apellidos:string;

  @OneToOne(() => DatosFamiliaresModel, datosFamiliares => datosFamiliares.concubino,{cascade:true})
  datosFamiliares:DatosFamiliaresModel

  
}