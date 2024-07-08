import { TipoDeSancion } from "src/core/entities/tipo-sancion.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"tipo_sancion"})
export class TipoDeSancionModel extends TipoDeSancion{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"int"})
    maximo_dias_de_sancion:number;
}