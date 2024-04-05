import { MedidaDeFuerza } from "src/core/entities/medida-de-fuerza.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PplModel } from "./ppl.model";
import { FuncionarioModel } from "./funcionario.model";

@Entity('medida_de_fuera')
export class MedidaDeFuerzaModel extends MedidaDeFuerza{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"date"})
    fecha_inicio:Date;

    @Column({type:"date"})
    fecha_fin:Date;

    @OneToMany(()=>PplModel, ppl=>ppl.medidas_de_fuerza)
    ppl_adheridos:Array<PplModel>;


    @Column({type:"varchar"})
    motivo:string;

    @Column({array:true, type:"varchar"})
    exigencias:Array<string>;

    @ManyToMany(()=>FuncionarioModel,funcionario=>funcionario.medidas_de_fuerza)
    negociadores:Array<FuncionarioModel>;
}