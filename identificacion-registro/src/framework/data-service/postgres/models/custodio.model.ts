import { Custodio } from "src/core/entities/custodio.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"custodio"})
export class CustodioModel extends Custodio{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"varchar"})
    apellido:string;

    @Column({type:"varchar"})
    cedula:string;
}