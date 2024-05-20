import { MedidaDeFuerza } from "src/core/entities/medida-de-fuerza.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PplModel } from "./ppl.model";
import { FuncionarioModel } from "./funcionario.model";
import { TipoDeMedidaDeFuerza } from "src/core/entities/tipo-medida-de-fuerza.entity";
import { TipoDeMedidaDeFuerzaModel } from "./tipo-mrdida-de-fuerza.model";

@Entity('medida_de_fuerza')
export class MedidaDeFuerzaModel extends MedidaDeFuerza{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"date"})
    fecha_inicio:Date;

    @Column({type:"date",nullable:true})
    fecha_fin:Date;

    @ManyToOne(()=>TipoDeMedidaDeFuerzaModel)
    tipo_de_medida_de_fuerza: TipoDeMedidaDeFuerzaModel;

    @ManyToMany(()=>PplModel, ppl=>ppl.medidas_de_fuerza)
    @JoinTable()
    ppl_adheridos:Array<PplModel>;


    @Column({type:"varchar"})
    motivo:string;

    @Column({array:true, type:"varchar",nullable:true})
    exigencias:Array<string>;

    @ManyToMany(()=>FuncionarioModel,funcionario=>funcionario.medidas_de_fuerza)
    negociadores:Array<FuncionarioModel>;
}