import { Condena } from "src/core/entities/condena.entity";
import { DefensorDTO } from "./defensor.dto";
import { Ppl } from "src/core/entities/ppl.entity";
import { PPLsEnExpedienteDTO } from "./ppl-en-expediente.dto";
export interface hechoPunibleCausa{
  hecho_punible:number;
  causa_judicial:number;
}
export class ExpedienteJudicialDTO{
  numeroDeExpediente:string;
  condenado:boolean;
  estado_procesal:string;
  caratula_expediente:string;
  despacho_judicial:number;
  hechosPuniblesCausas:Array<hechoPunibleCausa>;
  ppls_en_expediente:Array<PPLsEnExpedienteDTO>;
  circunscripcion:number;
  ciudad:number;
  anho:number;
  juzgado_de_tribunal_de_sentencia:string;
  secretaria:string;
  lugar_del_hecho:string;
  link_de_noticia:string;
  sentencia_definitiva:string;
  fecha_sentencia_definitiva:Date;
  
  
    
}

