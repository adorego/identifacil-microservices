import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";
import { MedidaDeFuerzaModel } from "./medida-de-fuerza.model";
import { Funcionario } from "src/core/entities/funcionario.entity";

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

    @ManyToOne(()=>EstablecimientoPenitenciarioModel)
    establecimiento:EstablecimientoPenitenciarioModel

    @ManyToMany(()=>MedidaDeFuerzaModel,medida_de_fuerza=>medida_de_fuerza.negociadores)
    @JoinTable()
    medidas_de_fuerza:Array<MedidaDeFuerzaModel>
}