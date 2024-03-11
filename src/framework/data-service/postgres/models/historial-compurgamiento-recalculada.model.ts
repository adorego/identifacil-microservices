import { HistorialDeCompurgamientoRecalculada } from "src/core/entities/historial-compurgamiento-recalculo.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";
import { CondenaModel } from "./condena.model";

@Entity({name:"historial_compurgamiento_recalculado"})
export class HistorialCompurgamientoRecalculadaModel extends HistorialDeCompurgamientoRecalculada{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    descripcion:string;

    @Column({type:"date"})
    nuevaFecha:Date;

    @Column({type:"varchar"})
    documento:string;

    @ManyToMany(()=>CondenaModel,condena=>condena.historial_recalculo_compurgamiento)
    condena:CondenaModel;
}