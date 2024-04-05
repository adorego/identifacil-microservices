import { IngresoVisitante } from "src/core/entities/ingreso-visitante.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PersonaModel } from "./persona.model";
import { PplModel } from "./ppl.model";
import { EstablecimientoPenitenciarioModel } from "./establecimiento-penitenciario.model";

@Entity({name:"ingreso_visitante"})
export class IngresoVisitanteModel extends IngresoVisitante{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>PersonaModel)
    visitante:PersonaModel;

    @ManyToOne(()=>PplModel)
    ppl_a_visitar:PplModel;

    @ManyToOne(()=>EstablecimientoPenitenciarioModel)
    establecimiento:EstablecimientoPenitenciarioModel;

    @Column({type:"varchar"})
    fecha_ingreso:string;

    @Column({type:"varchar"})
    hora_ingreso:string;
    
    @Column({type:"varchar"})
    observacion:string;
}