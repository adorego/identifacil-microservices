import { Permiso } from "src/core/entities/permiso.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

 @Entity({name:"permiso"})
export class PermisoModel extends Permiso{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

}