import { MotivoDeMedidaDeFuerza } from "src/core/entities/motivo-de-medida-de-fuerza.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"motivo_de_medida_de_fuerza"})
export class MotivoDeMedidaDeFuerzaModel extends MotivoDeMedidaDeFuerza{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;
    
    @Column({type:"varchar"})
    descripcion:string;
}