import { Persona } from "src/core/entities/persona.entity";
import { Ppl } from "src/core/entities/ppl.entity";

export class IngresoDTO{
    ppl_a_visitar:Ppl;
    visitante:Persona;
    tipo:number;
    fecha:string;
    hora:string;
    observacion:string;
    
}