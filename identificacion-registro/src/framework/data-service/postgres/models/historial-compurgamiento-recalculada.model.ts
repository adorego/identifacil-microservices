import { HistorialDeCompurgamientoRecalculada } from "src/core/entities/historial-compurgamiento-recalculo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";

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

    @ManyToOne(()=>ExpedienteJudicialModel, expediente=>expediente.historial_de_compurgamiento_recalculada)
    expediente:ExpedienteJudicialModel;
}