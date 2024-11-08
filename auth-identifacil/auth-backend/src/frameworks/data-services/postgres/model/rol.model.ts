import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermisoModel } from "./permiso.model";
import { Rol } from "src/core/entities/rol.entity";

@Entity({name:"rol"})
export class RolModel extends Rol{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @ManyToMany(()=>PermisoModel)
    @JoinTable()
    permisos:Array<PermisoModel>;
}