import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { GeneroModel } from "./genero.model";
import { Persona } from "src/core/entities/persona.entity";
import { RegistroPersonaModel } from "./registro-persona.model";
import { TipoIdentificacionModel } from "./tipo_identificacion.model";

@Entity({name:'persona'})
export class PersonaModel extends Persona{

  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(() => TipoIdentificacionModel, (tipoDeIdentificacion) => tipoDeIdentificacion.personas, {eager:true} )
  tipo_identificacion:TipoIdentificacionModel
  
  @Column({type:'varchar', nullable:false})
  numero_identificacion:string;
  
  @Column({type:"varchar", length: 100, unique:false,nullable:false})
  nombre:string;

  @Column({type:"varchar", length: 100, unique:false,nullable:false})
  apellido:string;

  @ManyToOne((type) => GeneroModel, (genero) => genero.personas, {eager:true})
  genero:GeneroModel;

  @Column({type:"date", nullable:false})
  fechaDeNacimiento:Date;

  @OneToOne((type) => RegistroPersonaModel, (registro) => registro.persona, {cascade: true, eager: true})
  @JoinColumn()
  registro:RegistroPersonaModel;


}