import { PrimaryGeneratedColumn } from "typeorm";
import { TipoDeFalta } from "./tipo_de_falta.entity";
import { Sancion } from "./sancion.entity";



export class Falta{
    
    id:number;

    tipo_de_falta:TipoDeFalta;

    fecha_de_inicio_de_la_falta:Date;

    fecha_de_fin_de_la_falta:Date;

    sanciones_aplicadas:Array<Sancion>
}