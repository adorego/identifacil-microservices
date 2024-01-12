import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { FamiliarModel } from "./familiar.model";
import { HijoPersonaModel } from "./hijo-persona.model";

@Entity({name:'datos_familiares'})
export class DatosFamiliaresModel extends DatosFamiliares{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'boolean', nullable:false})
  es_cabeza_de_familia:boolean;

  @OneToMany(() => FamiliarModel, (familiar) => familiar.datosFamiliares)
  familiares:FamiliarModel[];

  @Column({type:'boolean', nullable:false})
  tiene_concubino:boolean;

  @OneToMany(() => HijoPersonaModel, (hijo) => hijo.datosFamiliares)
  hijos:HijoPersonaModel[];
}