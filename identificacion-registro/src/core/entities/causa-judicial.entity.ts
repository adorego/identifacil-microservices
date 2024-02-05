import { Condena } from "./condena.entity";
import { HechoPunible } from "./hecho_punible.entity";
import { Persona } from "./persona.entity";
import { SituacionJudicial } from "./situacion-judicial.entity";

export class CausaJudicial{
  id:number;
  condenado:boolean;
  persona:Persona;
  caratula_causa:string;
  juzgado:string;
  hecho_punible:HechoPunible;
  condena:Condena;
  situacionJudicial:SituacionJudicial;
  
  
}