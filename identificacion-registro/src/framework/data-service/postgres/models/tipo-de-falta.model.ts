import { TipoDeFalta } from "src/core/entities/tipo_de_falta.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FaltaModel } from "./falta.model";

@Entity('tipo_falta')
export class TipoDeFaltaModel extends TipoDeFalta{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({type:"varchar"})
    nombre:string;

    
}