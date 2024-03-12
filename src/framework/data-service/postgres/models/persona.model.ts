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

  @OneToOne(() => DatosPersonalesModel, datosPersonales => datosPersonales.persona, {cascade:true, eager:true, onDelete:'CASCADE'})
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

  @OneToOne(() => RegistroPersonaModel, (registro) => registro.persona, {cascade: true, eager: true, onDelete:'CASCADE'})
  @JoinColumn()
  registro:RegistroPersonaModel;


  @OneToOne(() => SaludModel, saludModel => saludModel.persona, {cascade:true, eager:true, onDelete:'CASCADE'})
  @JoinColumn()
  salud:SaludModel;

  
  @OneToOne(() => EducacionFormacionModel, educacionFormacion => educacionFormacion.persona, {cascade: true, eager: true, onDelete:'CASCADE'})
  @JoinColumn()
  educacionFormacion:EducacionFormacionModel

  @OneToOne(() => SeguridadModel, seguridad => seguridad.persona, {cascade: true, eager: true, onDelete:'CASCADE'})
  @JoinColumn()
  seguridad:SeguridadModel;

  @OneToOne(() => DatosFamiliaresModel, datosFamiliares => datosFamiliares.persona, {cascade: true, eager: true, onDelete:'CASCADE'})
  @JoinColumn()
  datosFamiliares:DatosFamiliaresModel;

  @OneToOne(() => SituacionJudicialModel, situacionJuridica => situacionJuridica.persona, {cascade: true, eager: true, onDelete:'CASCADE'} )
  @JoinColumn()
  situacionJudicial:SituacionJudicialModel;

}