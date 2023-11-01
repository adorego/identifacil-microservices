import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tipoUsuario'})
export class UserTypeEntity{
  @PrimaryGeneratedColumn('uuid')
  id:string;
  @Column({type:"varchar", length:100, unique:true})
  nombre:string;
  @Column({type:"varchar", length:100, unique:true})
  codigo:string;
}