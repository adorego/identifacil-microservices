import { IngresoConyuge } from "src/core/entities/ingreso-coyuge.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ConcubinoModel } from "./concubino.model";
import { PplModel } from "./ppl.model";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";

@Entity({name:"ingreso_conyuge"})
export class IngresoConyugeModel extends IngresoConyuge{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>ConcubinoModel,{eager:true})
    conyuge:ConcubinoModel;

    @ManyToOne(()=>PplModel,{eager:true})
    ppl_a_visitar:PplModel;

    @ManyToOne(()=>EstablecimientoPenitenciarioModel,{eager:true})
    establecimiento:EstablecimientoPenitenciarioModel;

    @Column({type:"varchar"})
    fecha_ingreso:string;
    
    @Column({type:"varchar"})
    hora_ingreso:string;

    @Column({type:"varchar",nullable:true})
    observacion:string;

    @Column({type:"bool",default:"false"})
    ingreso_privada:boolean;

    @Column({type:"bool",default:"false"})
    volvio_a_salir:boolean;
}