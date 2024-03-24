import { MotivoDeTraslado } from "src/core/entities/motivo-traslado.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"motivo_de_traslado"})
export class MotivoDeTrasladoModel extends MotivoDeTraslado{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;
}