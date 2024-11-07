import { IntervencionDefensor } from "src/core/entities/intervencion.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DefensorModel } from "./defensor.model";
import { PplModel } from "./ppl.model";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";
import { EntrevistaDefensorModel } from "./entrevista-defensor.model";
import { CircunscripcionJudicial } from "src/core/entities/circunscripcion-judicial.entity";
import { CircunscripcionJudicialModel } from "./circunscripcion-judicial.model";


@Entity({name:'intervencion_defensor'})
export class IntervencionDefensorModel extends IntervencionDefensor{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>DefensorModel)
    defensor:DefensorModel;

    @ManyToOne(()=>PplModel)
    ppl:PplModel;
    
    @ManyToOne(()=>ExpedienteJudicialModel)
    expediente:ExpedienteJudicialModel;
    
    @Column({type:"date"})
    fecha_inicio_intervencion:Date;
    
    @Column({type:"date",nullable:true})
    fecha_fin_intervencion:Date;

    @ManyToOne(()=>CircunscripcionJudicialModel)
    circunscripcion: CircunscripcionJudicialModel;
    
    @Column({type:"varchar"})
    oficio_judicial_alta_intervencion:string;
    
    @Column({type:"varchar",nullable:true})
    oficio_judicial_baja_intervencion:string | null;
    
    @OneToMany(()=>EntrevistaDefensorModel,entrevista=>entrevista.intervencion,{eager:true})
    entrevistas:Array<EntrevistaDefensorModel>;
}