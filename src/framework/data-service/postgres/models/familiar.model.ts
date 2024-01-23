import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DatosFamiliaresModel } from "./datos-familiares.model";
import { Familiar } from "src/core/entities/familiar.entity";

@Entity({name:'familiar'})
export class FamiliarModel extends Familiar{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  nombre:string;

  @Column({type:'varchar', nullable:false})
  apellido:string;

  @Column({type:'varchar', nullable:false})
  vinculo:string;

  @Column({type:'varchar', nullable:false})
  lugar:string;

  @ManyToOne(() => DatosFamiliaresModel, (datosFamiliares => datosFamiliares.familiares))
  datosFamiliares:DatosFamiliaresModel;
}