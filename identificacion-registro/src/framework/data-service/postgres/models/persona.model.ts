import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { DatosFamiliaresModel } from "./datos-familiares.model";
import { DatosPersonalesModel } from "./datos-personales.model";
import { EducacionFormacionModel } from "./educacion-formacion.model";
import { GeneroModel } from "./genero.model";
import { LimitacionIdiomaticaModel } from "./limitacion-idiomatica.model";
import { Persona } from "src/core/entities/persona.entity";
import { RegistroPersonaModel } from "./registro-persona.model";
import { SaludFisica } from "src/core/entities/salud-fisica.entity";
import { SaludFisicaModel } from "./salud-fisica.model";
import { SaludMentalModel } from "./salud-mental.model";
import { SaludModel } from "./salud.model";
import { SeguridadModel } from "./seguridad.model";
import { SituacionJudicialModel } from "./situacion-judicial.model";
import { TipoIdentificacionModel } from "./tipo_identificacion.model";
import { ContactoDeEmbajadaModel } from "./contacto_embajada.model";

@Entity({name:'persona'})
export class PersonaModel extends Persona{

  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(() => TipoIdentificacionModel, (tipoDeIdentificacion) => tipoDeIdentificacion.personas, {eager:true} )
  @JoinColumn({name: 'id_tipo_identificacion'})
  tipo_identificacion:TipoIdentificacionModel
  
  @Column({type:'varchar', nullable:true})
  numero_identificacion:string;

  @Column({type:"boolean", nullable:true})
  tiene_cedula:boolean

  @Column({type:"boolean", nullable:true})
  es_extranjero: boolean;

  @OneToOne(() => DatosPersonalesModel, datosPersonales => datosPersonales.persona,{eager:true})
  @JoinColumn()
  datosPersonales:DatosPersonalesModel;
  
  @Column({type:'boolean', nullable:false})
  esPPL:boolean;
  
  @Column({type:"varchar", length: 100, unique:false,nullable:false})
  nombre:string;

  @Column({type:"varchar", length: 100, unique:false,nullable:false})
  apellido:string;

  @ManyToOne(() => GeneroModel, (genero) => genero.personas, {eager:true})
  @JoinColumn()
  genero:GeneroModel;

  @Column({
    type:'date'
  })
  fechaDeNacimiento:Date;

  @OneToOne(() => RegistroPersonaModel, (registro) => registro.persona, {eager:true})
  @JoinColumn()
  registro:RegistroPersonaModel;


  @OneToOne(() => SaludModel, saludModel => saludModel.persona, {eager:true})
  @JoinColumn()
  salud:SaludModel;

  
  @OneToOne(() => EducacionFormacionModel, educacionFormacion => educacionFormacion.persona, {eager:true})
  @JoinColumn()
  educacionFormacion:EducacionFormacionModel

  @OneToOne(() => SeguridadModel, seguridad => seguridad.persona, {eager:true})
  @JoinColumn()
  seguridad:SeguridadModel;

  @OneToOne(() => DatosFamiliaresModel, datosFamiliares => datosFamiliares.persona, {eager:true})
  @JoinColumn()
  datosFamiliares:DatosFamiliaresModel;

  @OneToOne(() => SituacionJudicialModel, situacionJuridica => situacionJuridica.persona, {eager:true} )
  @JoinColumn()
  situacionJudicial:SituacionJudicialModel;

  @Column({type:"boolean",default:false})
  tiene_contacto_en_embajada: boolean;
  
  @ManyToOne(()=>ContactoDeEmbajadaModel,{eager:true,nullable:true})
  contactoDeEmbajadaoConsulado:ContactoDeEmbajadaModel

}