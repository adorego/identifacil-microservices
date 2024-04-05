import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { Ppl } from "./ppl.entity";


export class IngresoPPL{
    id:number;
    ppl:Ppl;
    establecimiento:EstablecimientoPenitenciario;
    fecha:string;
    hora:string;
   
}