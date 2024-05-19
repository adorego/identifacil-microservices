import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { ConcubinoModel } from "./concubino.model";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { FamiliarModel } from "./familiar.model";
import { PersonaModel } from "./persona.model";
import { Concubino } from "src/core/entities/concubino.entity";

@Entity({name:'datos_familiares'})
export class DatosFamiliaresModel extends DatosFamiliares{

  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => PersonaModel, (persona) => persona.datosFamiliares)
  persona:PersonaModel;

  @Column({type:'boolean', nullable:true})
  esCabezaDeFamilia:boolean;

  @Column({type:'boolean', nullable:true})
  esCabezaDeFamilia_modificado:boolean;

  @Column({type:'boolean', nullable:true})
  tieneCirculoFamiliar:boolean;

  @Column({type:'boolean', nullable:true})
  tieneCirculoFamiliar_modificado:boolean;

  @OneToMany(() => FamiliarModel, (familiar) => familiar.datosFamiliares,{cascade:true, eager:true, onDelete:'CASCADE'})
  familiares:FamiliarModel[];

  @Column({type:'boolean', nullable:true})
  familiares_modificado:boolean;

  @Column({type:'boolean', nullable:true})
  tieneConcubino:boolean;

  @Column({type:'boolean', nullable:true})
  tieneConcubino_modificado:boolean;
  
  @OneToOne(() => ConcubinoModel, {eager:true})
  @JoinColumn()
  concubino:ConcubinoModel;
  
  @Column({type:'boolean', nullable:true})
  concubino_modificado:boolean;

 
  @OneToMany(()=>ConcubinoModel,concubino=>concubino.datosFamiliares,{eager:true})
  concubinos_anteriores:Array<ConcubinoModel>;
}