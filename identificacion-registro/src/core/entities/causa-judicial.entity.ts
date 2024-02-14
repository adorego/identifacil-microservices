import { CircunscripcionJudicial } from "./circunscripcion-judicial.entity";
import { Ciudad } from "./ciudad.entity";
import { Condena } from "./condena.entity";
import { DespachoJudicial } from "./despacho-judicial.entity";
import { HechoPunible } from "./hecho_punible.entity";
import { Ppl } from "./ppl.entity";
import { SituacionJudicial } from "./situacion-judicial.entity";

export class CausaJudicial{
  id:number;
  estado_procesal:string;
  condenado:boolean;
  ppls:Array<Ppl>;
  caratula_causa:string;
  despacho_judicial:DespachoJudicial;
  circunscripcion:CircunscripcionJudicial;
  ciudad:Ciudad;
  hechos_punibles:Array<HechoPunible>;
  condena:Condena;
  situacionJudicial:SituacionJudicial;
  numeroDeExpediente:number;
  numeroDeDocumento:number;
  anho:number;
  
  
}