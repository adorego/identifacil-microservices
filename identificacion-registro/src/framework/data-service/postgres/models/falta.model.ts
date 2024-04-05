import { Falta } from "src/core/entities/falta.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoDeFaltaModel } from "./tipo-de-falta.model";
import { SancionModel } from "./sancion.model";
import { PplModel } from "./ppl.model";

@Entity({name:"falta"})
export class FaltaModel extends Falta{
    @PrimaryGeneratedColumn()
    id:number;

    @OneToMany(()=>TipoDeFaltaModel,tipo_de_falta=>tipo_de_falta.faltas)
    tipo_de_falta:TipoDeFaltaModel;

    @Column({type:"date"})
    fecha_de_inicio_de_la_falta:Date;

    @Column({type:"date"})
    fecha_de_fin_de_la_falta:Date;

    sanciones_aplicadas:Array<SancionModel>

    ppls_con_faltas:Array<PplModel>
}