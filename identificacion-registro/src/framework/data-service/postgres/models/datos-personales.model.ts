import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { EstadoCivilModel } from "./estado-civil.model";
import { NacionalidadModel } from "./nacionalidad.model";
import { PersonaModel } from "./persona.model";
import { CiudadModel } from "./ciudad.model";
import { DepartamentoModel } from "./departamento.model";

@Entity({name:"datos_personales"})
export class DatosPersonalesModel extends DatosPersonales{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:true})
  apodo:string;

  

  @OneToOne(() => PersonaModel, (persona) => persona.datosPersonales)
  persona:PersonaModel;

  @ManyToOne(()=>EstadoCivilModel,{nullable:true,eager:true})
  estadoCivil:EstadoCivilModel;

  
  
  @ManyToOne(()=>NacionalidadModel,{eager:true,nullable:true})
  nacionalidad:NacionalidadModel;

  
  @Column({type:"varchar", nullable:true})
  lugarDeNacimiento:string;

  

  @Column({type:"varchar", nullable:true})
  direccion:string;

  
  @Column({type:"varchar",nullable:true})
  barrioCompania:string;

  @ManyToOne(()=>CiudadModel,{eager:true,nullable:true})
  ciudad: CiudadModel

  @ManyToOne(()=>DepartamentoModel,{eager:true,nullable:true})
  departamento: DepartamentoModel

  

  
  @Column({type:"varchar",nullable:true})
  numeroDeContacto:string;

  
  @Column({type:"varchar",nullable:true})
  nombreDeContacto:string;

 
  @Column({type:"varchar",nullable:true})
  contactoDeEmergencia1:string;

  @Column({type:"varchar",nullable:true})
  nombreDeContactoDeEmergencia1:string;

  

  @Column({type:"varchar",nullable:true})
  contactoDeEmergencia2:string;

  @Column({type:"varchar",nullable:true})
  nombreDeContactoDeEmergencia2:string;

  
  @Column({type:"boolean", nullable:true})
  pueblosIndigenas:boolean;

  

  @Column({type:"varchar", nullable:true})
  nombreEtnia:string;

  
  @Column({type:"boolean", nullable:true})
  perteneceAComunidadLGTBI:boolean;

  
  @Column({type:"varchar", nullable:true})
  grupoLgbti:string;

  
}