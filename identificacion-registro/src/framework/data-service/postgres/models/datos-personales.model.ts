import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { EstadoCivilModel } from "./estado-civil.model";
import { NacionalidadModel } from "./nacionalidad.model";
import { PersonaModel } from "./persona.model";

@Entity({name:"datos_personales"})
export class DatosPersonalesModel extends DatosPersonales{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:true})
  apodo:string;

  @Column({type:"boolean", nullable:true})
  apodo_modificado:boolean;

  @OneToOne(() => PersonaModel, (persona) => persona.datosPersonales)
  persona:PersonaModel;

  @ManyToOne(()=>EstadoCivilModel)
  estadoCivil:EstadoCivilModel;

  @Column({type:"boolean"})
  estadoCivil_modificado:boolean;
  
  @ManyToOne(()=>NacionalidadModel,{eager:true})
  nacionalidad:NacionalidadModel;

  @Column({type:"boolean"})
  nacionalidad_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  lugarDeNacimiento:string;

  @Column({type:"boolean"})
  lugarDeNacimiento_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  direccion:string;

  @Column({type:"boolean"})
  direccion_modificado:boolean;

  @Column({type:"varchar"})
  barrioCompania:string;

  @Column({type:"boolean", nullable:true})
  barrioCompania_modificado:boolean;

  
  @Column({type:"varchar"})
  numeroDeContacto:string;

  @Column({type:"boolean", nullable:true})
  numeroDeContacto_modificado:boolean;

  @Column({type:"varchar"})
  contactoDeEmergencia1:string;

  @Column({type:"boolean", nullable:true})
  contactoDeEmergencia1_modificado:boolean;

  @Column({type:"varchar"})
  contactoDeEmergencia2:string;

  @Column({type:"boolean", nullable:true})
  contactoDeEmergencia2_modificado:boolean;

  @Column({type:"boolean", nullable:true})
  pueblosIndigenas:boolean;

  @Column({type:"boolean", nullable:true})
  pueblosIndigenas_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  nombreEtnia:string;

  @Column({type:"boolean", nullable:true})
  nombreEtnia_modificado:boolean;

  @Column({type:"boolean", nullable:true})
  perteneceAComunidadLGTBI:boolean;

  @Column({type:"boolean", nullable:true})
  perteneceAComunidadLGTBI_modificado:boolean;

  @Column({type:"varchar", nullable:true})
  grupoLgbti:string;

  @Column({type:"varchar", nullable:true})
  grupoLgbti_modificado:boolean;
  
}