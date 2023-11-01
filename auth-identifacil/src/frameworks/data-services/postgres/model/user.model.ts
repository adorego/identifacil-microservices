import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import { UserTypeEntity } from "./user-type.model";

@Entity({name:'user'})
@Unique(['nombre', 'apellido'])
export class UserEntity{
  @PrimaryGeneratedColumn('uuid')
  id:string

  
  @Column({type:"varchar", length: 30, unique:true,nullable:false})
  ci:string;

  @Column({type:"varchar", length: 100, nullable:false})
  nombre:string;

  @Column({type:"varchar", length: 100, nullable:false})
  apellido:string;
  
  @Column({type:"varchar", length: 300, nullable:false})
  hash:string;

  @Column({type:"varchar", length:200, nullable:false})
  salt:string;

  @OneToOne(() => UserTypeEntity)
  @JoinColumn()
  tipo:UserTypeEntity

  

}