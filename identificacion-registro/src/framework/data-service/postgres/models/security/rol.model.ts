import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermisoModel } from "./permiso.model";
import { Rol } from "src/core/entities/security/rol.entity";

@Entity({name:"rol"})
export class RolModel extends Rol{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @ManyToMany(()=>PermisoModel,{eager:false})
    @JoinTable()
    permisos:Array<PermisoModel>;
}