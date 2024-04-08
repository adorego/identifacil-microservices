import { Departamento } from "src/core/entities/departamento.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"departamento"})
export class DepartamentoModel extends Departamento{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"varchar"})
    codigo:string;
}