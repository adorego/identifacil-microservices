import { Falta } from "./falta.entity";
import { Ppl } from "./ppl.entity";
import { TipoDeSancion } from "./tipo-sancion.entity";

export class Sancion{
    id:number;
    tipo:TipoDeSancion;
    fecha_inicio:Date;
    fecha_fin:Date;
    falta:Falta;
    ppl:Ppl;
    
}