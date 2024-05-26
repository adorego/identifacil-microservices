import { Concubino } from "./concubino.entity";
import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { Ppl } from "./ppl.entity";


export class IngresoConyuge{
    id:number;
    conyuge:Concubino;
    ppl_a_visitar:Ppl;
    establecimiento:EstablecimientoPenitenciario;
    fecha_ingreso:string;
    hora_ingreso:string;
    observacion:string;
    ingreso_privada:boolean;
    volvio_a_salir:boolean;
}