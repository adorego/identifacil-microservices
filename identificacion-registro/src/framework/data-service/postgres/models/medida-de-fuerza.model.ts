import { MedidaDeFuerza } from "src/core/entities/medida-de-fuerza.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PplModel } from "./ppl.model";
import { FuncionarioModel } from "./funcionario.model";
import { TipoDeMedidaDeFuerza } from "src/core/entities/tipo-medida-de-fuerza.entity";
import { TipoDeMedidaDeFuerzaModel } from "./tipo-medida-de-fuerza.model";
import { MotivoDeMedidaDeFuerzaModel } from "./motivo-de-medida-de-fuerza.model";
import { RegistroMedico } from "src/core/entities/registro-medico.entity";
import { RegistroMedicoModel } from "./registro-medico.model";

@Entity('medida_de_fuerza')
export class MedidaDeFuerzaModel extends MedidaDeFuerza{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"date"})
    fecha_inicio:Date;

    @Column({type:"date",nullable:true})
    fecha_fin:Date;

    @ManyToOne(()=>TipoDeMedidaDeFuerzaModel,{eager:true})
    tipo_de_medida_de_fuerza: TipoDeMedidaDeFuerzaModel;

    @ManyToOne(()=>PplModel)
    ppl:PplModel;


    @ManyToOne(()=>MotivoDeMedidaDeFuerzaModel,{eager:true})
    motivo:MotivoDeMedidaDeFuerzaModel;

    @OneToMany(()=>RegistroMedicoModel,registro_medico=>registro_medico.medida_de_fuerza,{eager:true})
    registros_medicos: Array<RegistroMedicoModel>

    @Column({array:true, type:"varchar",nullable:true})
    exigencias:Array<string>;

    @ManyToMany(()=>FuncionarioModel,funcionario=>funcionario.medidas_de_fuerza)
    negociadores:Array<FuncionarioModel>;
}