import { CircunscripcionJudicial } from "./circunscripcion-judicial.entity";
import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { PplEnExpediente } from "./pplEnExpediente.entity";
import { Usuario } from "./security/usuario.entity";


export class Defensor{
    id:number;
    tipo:"publico" | "privado";
    nombre:string;
    apellido:string;
    telefono:string;
    expedientes:Array<ExpedienteJudicial>;
    pplsEnExpediente:Array<PplEnExpediente>;
    circunscripcion:CircunscripcionJudicial;
    supervisor:boolean;
    usuario:Usuario
}