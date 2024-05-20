import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Concubino } from "src/core/entities/concubino.entity";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { DatosFamiliaresModel } from "./datos-familiares.model";
import { PersonaModel } from "./persona.model";
import { TipoIdentificacionModel } from "./tipo_identificacion.model";

@Entity({name:'concubino'})
export class ConcubinoModel extends Concubino{

  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'varchar', nullable:false})
  numeroDeIdentificacion:string;

  @Column({type:'varchar', nullable:false})
  nombres:string;

  @Column({type:'varchar', nullable:false})
  apellidos:string;

  
  @ManyToOne(()=>TipoIdentificacionModel,{eager:true})
  tipo_de_identificacion:TipoIdentificacionModel;

  @Column({type:"boolean", nullable:true})
  es_extranjero:boolean;

  @Column({type:"date", nullable:true})
  fecha_de_nacimiento:Date;

  @Column({type:"int", nullable:true})
  edad:number;

  @Column({type:"int", nullable:true})
  sexo:number;

  @Column({type:"varchar", nullable:true})
  lugar_de_nacimiento:string;

  @Column({type:"varchar", nullable:true})
  direccion:string;

  @Column({type:"varchar", nullable:true})
  barrio:string;

  @Column({type:"varchar", nullable:true})
  compania:string;

  @Column({type:"varchar", nullable:true})
  numero_de_contacto:string;

  @Column({type:"int", array:true, nullable:true})
  dias_de_visita:Array<number>//1:Domingo,2:Lunes....7:Sabado


  @ManyToOne(()=>DatosFamiliaresModel, datosFamiliar=>datosFamiliar.concubinos_anteriores)
  datosFamiliares:DatosFamiliaresModel

  
}