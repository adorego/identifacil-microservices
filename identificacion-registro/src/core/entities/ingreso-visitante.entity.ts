import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { Persona } from "./persona.entity";
import { Ppl } from "./ppl.entity";

export class IngresoVisitante{
    id:number;
    visitante:Persona;
    ppl_a_visitar:Ppl;
    establecimiento:EstablecimientoPenitenciario;
    fecha_ingreso:string;
    hora_ingreso:string;
    observacion:string;
    
   
}