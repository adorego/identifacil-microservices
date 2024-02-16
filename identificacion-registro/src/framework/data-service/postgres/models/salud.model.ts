import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { GrupoSanguineoModel } from "./grupo-sanguineo.model";
import { LimitacionIdiomatica } from "src/core/entities/limitacion-idiomatica.entity";
import { LimitacionIdiomaticaModel } from "./limitacion-idiomatica.model";
import { PersonaModel } from "./persona.model";
import { Salud } from "src/core/entities/salud.entity";
import { SaludFisica } from "src/core/entities/salud-fisica.entity";
import { SaludFisicaModel } from "./salud-fisica.model";
import { SaludMental } from "src/core/entities/salud-mental.entity";
import { SaludMentalModel } from "./salud-mental.model";
import { VacunaModel } from "./vacuna.model";

@Entity({name:'salud'})
export class SaludModel extends Salud{

  @PrimaryGeneratedColumn()
  id:number;

  @OneToOne(() => PersonaModel, persona => persona.salud)
  persona:PersonaModel;

  @Column({type:'boolean', nullable:true})
  tieneAfeccionADrogras:boolean;

  @Column({type:'boolean', nullable:false})
  tieneAfeccionADrogas_modificado:boolean;

  @ManyToOne(() => GrupoSanguineoModel,{eager:true})
  @JoinColumn()
  grupo_sanguineo:GrupoSanguineoModel;

  @Column({type:'boolean', nullable:false})
  grupo_sanguineo_modificado:boolean;

  @ManyToMany(() => VacunaModel)
  @JoinTable()
  vacunas_recibidas:Array<VacunaModel>;

  @Column({type:'boolean', nullable:false})
  vacunas_recibidas_modificada:boolean;

  @Column({type:'decimal', nullable:true})
  presion_arterial:number;

  @Column({type:'boolean', nullable:false})
  presion_arterial_modificada:boolean;

  @Column({type:'decimal', nullable:true})
  frecuencia_cardiaca:number;

  @Column({type:'boolean', nullable:false})
  frecuencia_cardiaca_modificada:boolean;

  @Column({type:'decimal', nullable:true})
  frecuencia_respiratoria:number;

  @Column({type:'boolean', nullable:false})
  frecuencia_respiratoria_modificada:boolean;

  @Column({type:'decimal', nullable:true})
  temperatura:number;

  @Column({type:'boolean', nullable:false})
  temperatura_modificada:boolean;

  @Column({type:'decimal', nullable:true})
  peso:number;

  @Column({type:'boolean', nullable:false})
  peso_modificado:boolean;

  @Column({type:'decimal', nullable:true})
  talla:number;

  @Column({type:'boolean', nullable:false})
  talla_modificado:boolean;

  @Column({type:'decimal', nullable:true})
  imc:number;

  @Column({type:'boolean', nullable:false})
  imc_modificado:boolean;

  @Column({type:'boolean', nullable:true})
  vdrl:boolean;

  @Column({type:'boolean', nullable:false})
  vdrl_modificado:boolean;

  @Column({type:'boolean', nullable:true})
  vih:boolean;

  @Column({type:'boolean', nullable:false})
  vih_modificado:boolean;

  @Column({type:'boolean', nullable:true})
  tb:boolean;

  @Column({type:'boolean', nullable:false})
  tb_modificado:boolean;

  @Column({type:'boolean', nullable:true})
  gestacion:boolean;

  @Column({type:'boolean', nullable:false})
  gestacion_modificado:boolean;

  @Column({type:'int2', nullable:true})
  tiempo_gestacion:number;

  @Column({type:'boolean', nullable:false})
  tiempo_gestacion_modificado:boolean;

  @Column({type:'date', nullable:true})
  fecha_parto:Date;

  @Column({type:'boolean', nullable:false})
  fecha_parto_modificada:boolean;

  @OneToOne(() => SaludFisicaModel,{cascade:true, eager:true})
  @JoinColumn()
  saludFisica: SaludFisicaModel;

  @OneToOne(() => SaludMentalModel, {cascade:true, eager:true})
  @JoinColumn()
  saludMental: SaludMentalModel;

  @OneToOne(() => LimitacionIdiomaticaModel,{cascade:true, eager:true})
  @JoinColumn()
  limitacionesIdiomaticas: LimitacionIdiomaticaModel;
}