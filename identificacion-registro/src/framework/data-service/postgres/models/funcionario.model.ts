import { Funcionario } from "src/core/entities/funcionario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";

@Entity({name:"funcionario"})
export class FuncionarioModel extends Funcionario{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"varchar"})
    apellido:string;

    @Column({type:"varchar"})
    cedula:string;

    @OneToOne(()=>EstablecimientoPenitenciarioModel)
    @JoinColumn()
    establecimiento:EstablecimientoPenitenciarioModel
}