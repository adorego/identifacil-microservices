import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { HistorialDeCompurgamientoRecalculada } from "./historial-compurgamiento-recalculo.entity";
import { Ppl } from "./ppl.entity";
import { TiempoDeCondena } from "./tiempo_de_condena.entity";

export class Condena{
  id:number;
  tiempo_de_condena:TiempoDeCondena;
  tiene_anhos_extra_por_medida_de_seguridad:boolean;
  anhos_extra_por_medida_de_seguridad:TiempoDeCondena;
  fecha_de_compurgamiento_inicial:Date;
  fecha_de_compurgamiento_recalculada:Date;
  historial_recalculo_compurgamiento:HistorialDeCompurgamientoRecalculada;
} 