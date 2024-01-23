import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { PersonaModel } from "./persona.model";
import { Seguridad } from "src/core/entities/seguridad.entity";

@Entity({name:'seguridad'})
export class SeguridadModel extends Seguridad{
  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => PersonaModel, persona => persona.seguridad)
  persona:PersonaModel;

  @Column({type:'boolean'})
  es_riesgo_para_personal:boolean;
  
  @Column({type:'varchar'})
  riesgo_personal:string;

  @Column({type:'boolean'})
  es_riesgo_para_otros_reclusos:boolean;

  @Column({type:'varchar'})
  riesgo_para_otros_reclusos:string;

  @Column({type:'boolean'})
  tiene_riesgo_de_ser_lesionado_por_otros_reclusos:boolean;
  
  @Column({type:'varchar'})
  riesgo_de_ser_lesionado_por_otros_reclusos:string;

  @Column({type:'boolean'})
  constituye_riesgo_de_danar_propiedad:boolean;

  @Column({type:'varchar'})
  riesgo_de_danar_propiedad:string;

  @Column({type:'boolean'})
  es_miembro_de_grupo_que_es_amenaza_para_la_seguridad:boolean;

  @Column({type:'varchar'})
  miembro_de_grupo_que_es_amenaza_para_la_seguridad:string;

  @Column({type:'boolean'})
  tiene_entrenamiento_militar_previo:boolean;

  @Column({type:'varchar'})
  entrenamiento_militar_previo:string;

  @Column({type:'boolean'})
  era_funcionario_publico:boolean;

  @Column({type:'varchar'})
  cargo_funcionario_publico:string;
}
