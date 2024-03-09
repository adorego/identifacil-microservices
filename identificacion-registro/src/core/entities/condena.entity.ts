import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { Ppl } from "./ppl.entity";
import { TiempoDeCondena } from "./tiempo_de_condena.entity";
import { HechoPunibleCausaJudicial } from "./hecho-punible-causa-judicial.entity";

export class Condena{
  id:number;
  tiempo_de_condena:TiempoDeCondena;
  tiene_anhos_extra_por_medida_de_seguridad:boolean;
  anhos_extra_por_medida_de_seguridad:TiempoDeCondena;
  
} 