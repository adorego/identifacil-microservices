import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DatosFamiliaresModel } from "./datos-familiares.model";
import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";
import { Familiar } from "src/core/entities/familiar.entity";
import { VinculoFamiliarModel } from "./vinculo-familiar.model";

@Entity({name:'familiar'})
export class FamiliarModel extends Familiar{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  nombre:string;

  @Column({type:'varchar', nullable:false})
  apellido:string;

  @ManyToOne(()=>VinculoFamiliarModel)
  vinculo:VinculoFamiliarModel;

  @ManyToOne(()=>EstablecimientoPenitenciarioModel)
  establecimiento:EstablecimientoPenitenciario;

  @Column({type:"boolean", default:false})
  esFuncionario: boolean;

  @ManyToOne(() => DatosFamiliaresModel, (datosFamiliares => datosFamiliares.familiares))
  datosFamiliares:DatosFamiliaresModel;
}