import { Condena } from "src/core/entities/condena.entity";
import { DefensorDTO } from "./defensot.dto";

export class CausaJudicialDTO{
  condenado:boolean;
  estado_procesal:string;
  caratula_causa:string;
  despacho_judicial:number;
  hechos_punibles:Array<number>;
  ppls:Array<number>;
  circunscripcion:number;
  ciudad:number;
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
  defensor:DefensorDTO;
  
    
}

