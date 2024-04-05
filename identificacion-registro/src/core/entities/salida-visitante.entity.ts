import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { IngresoVisitante } from "./ingreso-visitante.entity";
import { Persona } from "./persona.entity";
import { Ppl } from "./ppl.entity";

export class SalidaVisitante{
    id:number;
    visitante:Persona;
    ppl_que_visito:Ppl;
    fecha_salida:string;
    hora_salida:string;
    entrada_asociada:IngresoVisitante;
    establecimiento:EstablecimientoPenitenciario;
    observacion:string;
}