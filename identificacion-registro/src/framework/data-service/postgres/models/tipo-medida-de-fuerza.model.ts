import { TipoDeMedidaDeFuerza } from "src/core/entities/tipo-medida-de-fuerza.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"tipo_de_medida_de_fuerza"})
export class TipoDeMedidaDeFuerzaModel extends TipoDeMedidaDeFuerza{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre: string;
}