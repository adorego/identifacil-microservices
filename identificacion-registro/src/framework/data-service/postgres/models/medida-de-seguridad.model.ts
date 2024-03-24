import { MedidaDeSeguridad } from "src/core/entities/medida-de-seguridad.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"medida_de_seguridad"})
export class MedidaDeSeguridadModel extends MedidaDeSeguridad{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    nombre:string;

}