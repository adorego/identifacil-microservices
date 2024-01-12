import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { EducacionFormacion } from "src/core/entities/educacion-formacion.entity";

@Entity({name:'educacion_formal'})
export class EducacionFormacionModel extends EducacionFormacion{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar'})
  nivel_academico:string;

  @Column({type:'varchar'})
  institucion_educativa:string;

  @Column({type:'boolean'})
  tiene_oficio:boolean;

  @Column({type:'varchar'})
  oficio:string;

  @Column({type:'varchar'})
  ultimo_lugar_de_trabajo:string;
}