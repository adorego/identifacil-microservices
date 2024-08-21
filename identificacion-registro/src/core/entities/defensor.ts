import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { PplEnExpediente } from "./pplEnExpediente.entity";


export class Defensor{
    id:number;
    tipo:"publico" | "privado";
    nombre:string;
    apellido:string;
    telefono:string;
    expedientes:Array<ExpedienteJudicial>
    pplsEnExpediente:Array<PplEnExpediente>
}