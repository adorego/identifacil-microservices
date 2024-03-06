import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { HechoPunible } from "./hecho_punible.entity";
import { IngresoAPrision } from "./ingreso-a-prision.entity";
import { Persona } from "./persona.entity";

export class SituacionJudicial{
  id:number;
  persona:Persona;
  primera_vez_en_prision:boolean;
  cantidad_de_veces_que_ingreso:number;
  expediente_numero_de_documento:string;
  expediente_fecha_de_documento:Date;
  sentencia_definitiva:string;
  ingresos_a_prision:Array<IngresoAPrision>;
  caratula:string;
  


}