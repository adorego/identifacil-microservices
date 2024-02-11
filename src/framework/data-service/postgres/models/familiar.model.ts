import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { DatosFamiliaresModel } from "./datos-familiares.model";
import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
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

  @Column({type:'varchar', nullable:false})
  vinculo:VinculoFamiliarModel;

  @Column({type:'varchar', nullable:false})
  establecimiento:EstablecimientoPenitenciario;

  @ManyToOne(() => DatosFamiliaresModel, (datosFamiliares => datosFamiliares.familiares))
  datosFamiliares:DatosFamiliaresModel;
}