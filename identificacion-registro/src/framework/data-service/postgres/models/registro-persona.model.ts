import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { PersonaModel } from "./persona.model";
import { RegistroPersona } from "src/core/entities/registro-persona.entity";

@Entity('registro-persona')
export class RegistroPersonaModel extends RegistroPersona{

  constructor(){
    super();
  }
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({type:"varchar", length: 100, unique:true,nullable:false})
  foto1:string;

  @Column('integer', {array: true, default:[]})
  descriptorFacial1:Array<Number>

  @Column({type:"varchar", length: 100, unique:true,nullable:false})
  foto2:string;

  @Column('integer', {array: true, default:[]})
  descriptorFacial2:Array<Number>

  @Column({type:"varchar", length: 100, unique:true,nullable:false})
  foto3:string;

  @Column('integer', {array: true, default:[]})
  descriptorFacial3:Array<Number>
  
  @CreateDateColumn()
  fecha_registro:Date;

  @OneToOne(() => PersonaModel, persona => persona.registro)
  persona:PersonaModel;

}