import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PplModel } from "./ppl.model";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";
import { TiempoDeCondenaModel } from "./tiempo_de_condena.model";
import { Condena } from "src/core/entities/condena.entity";
import { HechoPunibleCausaJudicialModel } from "./hecho-punible-causa-judicial.model";
import { HistorialCompurgamientoRecalculadaModel } from "./historial-compurgamiento-recalculada.model";

@Entity({name:"condena"})
export class CondenaModel extends Condena{
    @PrimaryGeneratedColumn()
    id:number;
    
    
    @ManyToOne(()=>TiempoDeCondenaModel,tiempoDeCondena=>tiempoDeCondena.condenas_principales,{eager:true})
    tiempo_de_condena:TiempoDeCondenaModel;
       
    @Column({type:"boolean"})
    tiene_anhos_extra_por_medida_de_seguridad:boolean;

    @ManyToOne(()=>TiempoDeCondenaModel,tiempoDeCondena=>tiempoDeCondena.condenas_secundarias,{eager:true})
    anhos_extra_por_medida_de_seguridad:TiempoDeCondenaModel;

    @Column({type:"date"})
    fecha_de_compurgamiento_inicial:Date;
    
    @Column({type:"date",nullable:true})
    fecha_de_compurgamiento_recalculada:Date;
    
    @OneToMany(()=>HistorialCompurgamientoRecalculadaModel,historialCompurgamiento=>historialCompurgamiento.condena)
    @JoinTable()
    historial_recalculo_compurgamiento:HistorialCompurgamientoRecalculadaModel;
}