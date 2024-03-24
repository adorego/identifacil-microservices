import { Vehiculo } from "src/core/entities/vehiculo.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"vehiculo"})
export class VehiculoModel extends Vehiculo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    chapa:string;

    @Column({type:"varchar"})
    chasis:string;

    @Column({type:"varchar"})
    marca:string;

    @Column({type:"int2"})
    anho:number;
}