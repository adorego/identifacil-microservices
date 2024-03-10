import { PplEnExpediente } from "src/core/entities/pplEnExpediente.entity";
import { CondenaModel } from "./condena.model";
import { DefensorModel } from "./defensor.model";
import { PplModel } from "./ppl.model";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";
import { HechoPunibleCausaJudicialModel } from "./hecho-punible-causa-judicial.model";

@Entity({name:"ppl_en_expediente"})
export class PplEnExpedienteModel extends PplEnExpediente{
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(()=>PplModel,ppl=>ppl.pplEnExpedientes,{eager:true})
    ppl:PplModel;

    @Column({type:"boolean"})
    condenado:boolean;

    @OneToOne(()=>CondenaModel,{eager:true})
    @JoinColumn()
    condena:CondenaModel;

    @ManyToOne(()=>DefensorModel, defensor=>defensor.pplsEnExpediente,{eager:true})
    defensor:DefensorModel;

    @ManyToOne(()=>ExpedienteJudicialModel, expediente=>expediente.pplsEnExpediente)
    expediente:ExpedienteJudicialModel;

    @ManyToMany(()=>HechoPunibleCausaJudicialModel,hechoPunibleCausa=>hechoPunibleCausa.pplEnExpediente)
    @JoinTable()
    hechosPuniblesCausas:Array<HechoPunibleCausaJudicialModel>;
   
    @Column({type:"varchar"})
    sentencia_definitiva:string;

    @Column({type:"date"})
    fecha_sentencia_definitiva:Date;

    @Column({type:"date"})
    fecha_de_aprehension:Date;
}