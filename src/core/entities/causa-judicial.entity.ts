import { CircunscripcionJudicial } from "./circunscripcion-judicial.entity";
import { Ciudad } from "./ciudad.entity";
import { Condena } from "./condena.entity";
import { Defensor } from "./defensor";
import { DespachoJudicial } from "./despacho-judicial.entity";
import { HechoPunible } from "./hecho_punible.entity";
import { SituacionJudicial } from "./situacion-judicial.entity";

export class CausaJudicial{
  id?:number;
  estado_procesal:string;
  condenado:boolean;
  ppls:Array<number>;
  caratula_causa:string;
  despacho_judicial:DespachoJudicial;
  circunscripcion:CircunscripcionJudicial;
  ciudad:Ciudad;
  hechos_punibles:Array<HechoPunible>;
  numeroDeExpediente:number;
  numeroDeDocumento:number;
  anho:number;
  fecha_de_aprehension:Date;
  tiempo_de_condena:number;
  tiene_anhos_extra_de_seguridad:boolean;
  tiempo_de_seguridad:number;
  sentencia_definitiva:string;
  fecha_de_compurgamiento_inicial:Date;
  fecha_de_compurgamiento_recalculada:Date;
  juzgado_de_tribunal_de_sentencia:string;
  secretaria:string;
  lugar_del_hecho:string;
  link_de_noticia:string;
  defensor:Defensor;

  
  
}