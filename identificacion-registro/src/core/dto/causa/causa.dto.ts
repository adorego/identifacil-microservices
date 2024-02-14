import { Condena } from "src/core/entities/condena.entity";

export class CausaJudicialDTO{
  id_persona:number;
  condenado:boolean;
  estado_procesal:string;
  caratula_causa:string;
  despachoJudicial:number;
  hechos_punibles:Array<number>;
  condena?:Condena;
  ppls:Array<number>;
  circunscripcion:number;
  ciudad:number;
  numeroDeExpediente:number;
  numeroDeDocumento:number;
  anho:number;
  
}