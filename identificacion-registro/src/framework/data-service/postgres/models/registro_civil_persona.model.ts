import { RegistroCivilPersona } from "src/core/entities/registro_civil_persona.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"registro_civil_persona"})
export class RegistroCivilPersonaModel extends RegistroCivilPersona{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar",nullable:false,unique:true})
    cedula_identidad:string;

    @Column({type:"varchar",nullable:false})
    nombres:string;

    @Column({type:"varchar",nullable:false})
    apellidos:string;

    @Column({type:"varchar",nullable:false})
    fecha_nacimiento:string;

    @Column({type:"int2",nullable:false})
    codigo_genero: number;

}