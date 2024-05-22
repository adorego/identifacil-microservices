import { RegistroMedico } from "src/core/entities/registro-medico.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedidaDeFuerzaModel } from "./medida-de-fuerza.model";

@Entity({name:"registro_medico"})
export class RegistroMedicoModel extends RegistroMedico{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    diagnostico:string;

    @Column({type:"date"})
    fecha: Date;

    @ManyToOne(()=>MedidaDeFuerzaModel)
    medida_de_fuerza:MedidaDeFuerzaModel

    @Column({type:"varchar",nullable:true})
    archivo_registro_medico:string;
}