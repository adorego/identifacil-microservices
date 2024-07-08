import { PrimaryGeneratedColumn } from "typeorm";
import { TipoDeFalta } from "./tipo_de_falta.entity";
import { Sancion } from "./sancion.entity";

import { Ppl } from "./ppl.entity";
import { GradoDeFalta } from "./grado-de-falta.entity";
import { TipoDeVictima } from "./tipo-victima.entity";



export class Falta{
    
    id:number;

    tipo_de_falta:TipoDeFalta;

    fecha_y_hora_de_la_falta:Date;

    numero_de_resolucion:string;

    fecha_de_la_resolucion:Date;

    archivo_de_resolucion:string;

    descripcion_de_la_falta:string;

    grado_de_falta:GradoDeFalta;

    victima_de_la_falta:string;

    tipo_victima:TipoDeVictima;

    ppl:Ppl;

    sanciones_aplicadas:Array<Sancion>
}