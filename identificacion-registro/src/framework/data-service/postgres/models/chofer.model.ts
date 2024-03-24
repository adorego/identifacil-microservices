import { Chofer } from "src/core/entities/chofer.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"chofer"})
export class ChoferModel extends Chofer{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"varchar"})
    apellido:string;

    @Column({type:"varchar"})
    cedula:string;
}