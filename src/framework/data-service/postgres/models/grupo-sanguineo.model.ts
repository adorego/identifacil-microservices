import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { GrupoSanguineo } from "src/core/entities/grupo-sanguineo.entity";
import { SaludModel } from "./salud.model";

@Entity({name:'grupo_sanguineo'})
export class GrupoSanguineoModel extends GrupoSanguineo{
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column()
  nombre:string;

  @OneToMany(() => SaludModel, (salud) => salud.grupo_sanguineo)
  personasSalud:SaludModel[];
}