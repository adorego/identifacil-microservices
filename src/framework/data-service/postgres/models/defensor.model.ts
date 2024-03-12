import { Defensor } from "src/core/entities/defensor";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExpedienteJudicialModel } from "./expediente-judicial.model";
import { PplEnExpediente } from "src/core/entities/pplEnExpediente.entity";
import { PplEnExpedienteModel } from "./ppl-en-expediente.model";

@Entity({name:"defensor"})
export class DefensorModel extends Defensor{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    tipo:"publico" | "privado";

    @Column({type:"varchar"})
    nombre:string;

    @Column({type:"varchar"})
    apellido:string;


    @Column({type:"varchar"})
    telefono:string;

    
    @OneToMany(()=>PplEnExpedienteModel,pplEnExpediente=>pplEnExpediente.defensor)
    pplsEnExpediente: PplEnExpedienteModel[];
}