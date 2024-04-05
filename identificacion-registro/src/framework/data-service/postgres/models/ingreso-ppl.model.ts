import { IngresoPPL } from "src/core/entities/ingreso-ppl.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PplModel } from "./ppl.model";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";

@Entity({name:"ingreso_ppl"})
export class IngresoPPLModel extends IngresoPPL{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>PplModel)
    ppl:PplModel;

    @ManyToOne(()=>EstablecimientoPenitenciarioModel)
    establecimiento:EstablecimientoPenitenciarioModel;

    @Column({type:"varchar"})
    fecha:string;

    @Column({type:"varchar"})
    hora:string;
    
}