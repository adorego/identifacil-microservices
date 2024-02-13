import { Condena } from "src/core/entities/condena.entity";

export class CausaDTO{
  condenado:boolean;
  id_persona:number;
  caratula_causa:string;
  juzgado:string;
  hecho_punible:number;
  condena:Condena;
  
}