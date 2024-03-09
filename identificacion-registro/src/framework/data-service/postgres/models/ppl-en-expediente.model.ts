import { PplEnExpediente } from "src/core/entities/pplEnExpediente.entity";
import { CondenaModel } from "./condena.model";
import { DefensorModel } from "./defensor.model";
import { PplModel } from "./ppl.model";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";

@Entity({name:"ppl_en_expediente"})
export class PplEnExpedienteModel extends PplEnExpediente{
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(()=>PplModel,ppl=>ppl.pplEnExpedientes,{eager:true})
    ppl:PplModel;

    @OneToOne(()=>CondenaModel,{eager:true})
    @JoinColumn()
    condena:CondenaModel;

    @ManyToOne(()=>DefensorModel, defensor=>defensor.pplsEnExpediente,{eager:true})
    defensor:DefensorModel;

    @ManyToOne(()=>ExpedienteJudicialModel, expediente=>expediente.pplsEnExpediente)
    expediente:ExpedienteJudicialModel;

    

}