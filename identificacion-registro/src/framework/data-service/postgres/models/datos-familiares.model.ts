import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { ConcubinoModel } from "./concubino.model";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { FamiliarModel } from "./familiar.model";
import { PersonaModel } from "./persona.model";

@Entity({name:'datos_familiares'})
export class DatosFamiliaresModel extends DatosFamiliares{

  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => PersonaModel, (persona) => persona.datosFamiliares)
  persona:PersonaModel;

  @Column({type:'boolean', nullable:true})
  esCabezaDeFamilia:boolean;

  @Column({type:'boolean', nullable:false})
  esCabezaDeFamilia_modificado:boolean;

  @Column({type:'boolean', nullable:true})
  tieneCirculoFamiliar:boolean;

  @Column({type:'boolean', nullable:false})
  tieneCirculoFamiliar_modificado:boolean;

  @OneToMany(() => FamiliarModel, (familiar) => familiar.datosFamiliares, {cascade:true})
  familiares:FamiliarModel[];

  @Column({type:'boolean', nullable:false})
  familiares_modificado:boolean;

  @Column({type:'boolean', nullable:true})
  tieneConcubino:boolean;

  @Column({type:'boolean', nullable:false})
  tieneConcubino_modificado:boolean;
  
  @OneToOne(() => ConcubinoModel, {cascade:true})
  @JoinColumn()
  concubino:ConcubinoModel;
  
  @Column({type:'boolean', nullable:false})
  concubino_modificado:boolean;
}