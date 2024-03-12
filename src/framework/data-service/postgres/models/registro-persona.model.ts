import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { PersonaModel } from "./persona.model";
import { RegistroPersona } from "src/core/entities/registro-persona.entity";

@Entity('registro_persona')
export class RegistroPersonaModel extends RegistroPersona{

  constructor(){
    super();
  }
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({type:"varchar", length: 100, unique:true,nullable:false})
  foto1:string;

  @Column({type: 'varchar'})
  descriptorFacial1:string

  @Column({type:"varchar", length: 100, unique:true,nullable:false})
  foto2:string;

  @Column({type: 'varchar'})
  descriptorFacial2:string

  @Column({type:"varchar", length: 100, unique:true,nullable:false})
  foto3:string;

  @Column({type: 'varchar'})
  descriptorFacial3:string
  
  @CreateDateColumn({
    type:'timestamp'
  })
  fecha_registro:Date;

  @OneToOne(() => PersonaModel, persona => persona.registro)
  persona:PersonaModel;

}