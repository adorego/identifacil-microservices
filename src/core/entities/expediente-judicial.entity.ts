import { CircunscripcionJudicial } from "./circunscripcion-judicial.entity";
import { Ciudad } from "./ciudad.entity";
import { Condena } from "./condena.entity";
import { Defensor } from "./defensor";
import { DespachoJudicial } from "./despacho-judicial.entity";
import { HechoPunibleCausaJudicial } from "./hecho-punible-causa-judicial.entity";
import { HechoPunible } from "./hecho_punible.entity";
import { HistorialDeCompurgamientoRecalculada } from "./historial-compurgamiento-recalculo.entity";
import { Ppl } from "./ppl.entity";
import { PplEnExpediente } from "./pplEnExpediente.entity";
import { SituacionJudicial } from "./situacion-judicial.entity";

export class ExpedienteJudicial
{
  id:number;
  numeroDeExpediente:string;
  estado_procesal:string;
  condenado:boolean;
  ppls_en_expediente:Array<PplEnExpediente>;
  caratula_expediente:string;
  despacho_judicial:DespachoJudicial;
  circunscripcion:CircunscripcionJudicial;
  ciudad:Ciudad;
  hechosPuniblesCausas:Array<HechoPunibleCausaJudicial>;
  anho:number;
  juzgado_de_tribunal_de_sentencia:string;
  secretaria:string;
  lugar_del_hecho:string;
  link_de_noticia:string;
  sentencia_definitiva:string;
  fecha_sentencia_definitiva:Date;
  fecha_del_hecho:Date;
  
  
  
}