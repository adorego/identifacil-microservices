import { ExpedienteJudicial } from "./expediente-judicial.entity";


export class HistorialDeCompurgamientoRecalculada{
    id:number;
    descripcion:string;
    nuevaFecha:Date;
    documento:String;
    expediente:ExpedienteJudicial;
}