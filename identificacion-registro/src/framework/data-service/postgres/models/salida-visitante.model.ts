import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonaModel } from "./persona.model";
import { SalidaVisitante } from "src/core/entities/salida-visitante.entity";
import { PplModel } from "./ppl.model";
import { IngresoVisitanteModel } from "./ingreso-visitante.model";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";


@Entity({name:"salida_visitante"})
export class SalidaVisitanteModel extends SalidaVisitante{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>PersonaModel,{eager:true})
    visitante:PersonaModel;

    @ManyToOne(()=>PplModel,{eager:true})
    ppl_que_visito:PplModel;

    @Column({type:"varchar"})
    fecha_salida:string;

    @Column({type:"varchar"})
    hora_salida:string;

    @OneToOne(()=>IngresoVisitanteModel)
    @JoinColumn()
    entrada_asociada:IngresoVisitanteModel;

    @ManyToOne(()=>EstablecimientoPenitenciarioModel,{eager:true})
    establecimiento: EstablecimientoPenitenciarioModel;

    @Column({type:"varchar"})
    observacion:string;
}