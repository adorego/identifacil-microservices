import { TipoDeVictima } from "src/core/entities/tipo-victima.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"tipo_de_victima"})
export class TipoDeVictimaModel extends TipoDeVictima{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;
}