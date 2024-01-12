import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { BarrioModel } from "./barrio.model";
import { CompaniaModel } from "./compania.model";
import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { EstadoCivilModel } from "./estado-civil.model";
import { NacionalidadModel } from "./nacionalidad.model";
import { PersonaModel } from "./persona.model";

@Entity({name:"datos_personales"})
export class DatosPersonalesModel extends DatosPersonales{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar'})
  apodo:string;

  @Column({type:"boolean"})
  apodo_modificado:boolean;

  @OneToOne(() => PersonaModel, (persona) => persona.datosPersonales)
  persona:PersonaModel;

  @Column({type:"varchar"})
  estadoCivil:EstadoCivilModel;

  @Column({type:"boolean"})
  estadoCivil_modificado:boolean;
  
  @ManyToOne(() => NacionalidadModel)
  nacionalidad:NacionalidadModel;

  @Column({type:"boolean"})
  nacionalidad_modificado:boolean;

  @Column({type:"date"})
  lugarDeNacimiento:Date;

  @Column({type:"boolean"})
  lugarDeNacimiento_modificado:boolean;

  @Column({type:"varchar"})
  direccion:string;

  @Column({type:"boolean"})
  direccion_modificado:boolean;

  @ManyToOne(() => BarrioModel)
  barrio:BarrioModel;

  @Column({type:"boolean"})
  barrio_modificado:boolean;

  @ManyToOne(() => CompaniaModel)
  compania:CompaniaModel;

  @Column({type:"boolean"})
  compania_modificado:boolean;

  @Column({type:"varchar"})
  numeroDeContacto:string;

  @Column({type:"boolean"})
  numeroDeContacto_modificado:boolean;

  @Column({type:"varchar"})
  contactoDeEmergencia1:string;

  @Column({type:"boolean"})
  contactoDeEmergencia1_modificado:boolean;

  @Column({type:"varchar"})
  contactoDeEmergencia2:string;

  @Column({type:"boolean"})
  contactoDeEmergencia2_modificado:boolean;

  @Column({type:"boolean"})
  pueblosIndigenas:boolean;

  @Column({type:"boolean"})
  pueblosIndigenas_modificado:boolean;

  @Column({type:"varchar"})
  nombreEtnia:string;

  @Column({type:"boolean"})
  nombreEtnia_modificado:boolean;

  @Column({type:"boolean"})
  perteneceAComunidadLGTBI:boolean;

  @Column({type:"boolean"})
  perteneceAComunidadLGTBI_modificado:boolean;
  
}