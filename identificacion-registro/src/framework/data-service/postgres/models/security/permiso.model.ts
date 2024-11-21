import { Permiso } from "src/core/entities/security/permiso.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

 @Entity({name:"permiso"})
export class PermisoModel extends Permiso{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"varchar",nullable:true})
    modulo:string;

    @Column({type:"varchar",nullable:true})
    grupo:string;


}