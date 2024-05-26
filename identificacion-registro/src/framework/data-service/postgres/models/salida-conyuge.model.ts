import { SalidaConyuge } from "src/core/entities/salida-conyuge.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConcubinoModel } from "./concubino.model";
import { PplModel } from "./ppl.model";
import { IngresoConyugeModel } from "./ingreso-conyuge.model";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";

@Entity({name:"salida_conyuge"})
export class SalidaConyugeModel extends SalidaConyuge{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>ConcubinoModel,{eager:true})
    conyuge:ConcubinoModel;

    @ManyToOne(()=>PplModel,{eager:true})
    ppl_que_visito:PplModel;

    @Column({type:"varchar"})
    fecha_salida:string;

    @Column({type:"varchar"})
    hora_salida:string;

   
    @OneToOne(()=>IngresoConyugeModel,{eager:true})
    @JoinColumn()
    entrada_asociada:IngresoConyugeModel;

    @ManyToOne(()=>EstablecimientoPenitenciarioModel,{eager:true})
    establecimiento:EstablecimientoPenitenciarioModel;

    @Column({type:"varchar",nullable:true})
    observacion:string;
}