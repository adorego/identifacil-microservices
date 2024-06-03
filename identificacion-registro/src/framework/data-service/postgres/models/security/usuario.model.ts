import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { RolModel } from "./rol.model";
import { Usuario } from "src/core/entities/security/usuario.entity";


@Entity({name:'usuario'})
@Unique(['nombre', 'apellido'])
export class UsuarioModel extends Usuario{
  @PrimaryGeneratedColumn()
  id:number

  
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

  @ManyToMany(()=>RolModel)
  @JoinTable()
  roles:Array<RolModel>
  

}