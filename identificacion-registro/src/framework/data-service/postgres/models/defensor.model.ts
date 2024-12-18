import { Defensor } from "src/core/entities/defensor";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PplEnExpedienteModel } from "./ppl-en-expediente.model";
import { CircunscripcionJudicialModel } from "./circunscripcion-judicial.model";
import { UsuarioModel } from "./security/usuario.model";

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

    @ManyToOne(()=>CircunscripcionJudicialModel,{eager:true})
    circunscripcion: CircunscripcionJudicialModel;

    @Column({type:"boolean",default:false})
    supervisor:boolean

    @OneToOne(()=>UsuarioModel,{eager:true})
    @JoinColumn()
    usuario: UsuarioModel;
}