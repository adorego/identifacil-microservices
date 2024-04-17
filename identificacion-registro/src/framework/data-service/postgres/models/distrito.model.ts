import { Departamento } from "src/core/entities/departamento.entity";
import { Distrito } from "src/core/entities/distrito.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DepartamentoModel } from "./departamento.model";

@Entity({name:"distrito"})
export class DistritoModel extends Distrito{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"varchar"})
    codigo:string;

    @ManyToOne(()=>DepartamentoModel)
    departamento: DepartamentoModel;
}