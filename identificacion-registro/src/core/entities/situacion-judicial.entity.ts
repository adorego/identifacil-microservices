import { CausaJudicial } from "./causa-judicial.entity";
import { IngresoAPrision } from "./ingreso-a-prision.entity";
import { Persona } from "./persona.entity";

export class SituacionJudicial{
  id:number;
  persona:Persona;
  primera_vez_en_prision:boolean;
  cantidad_de_veces_que_ingreso:number;
  expediente_numero_de_documento:string;
  expediente_fecha_de_documento:Date;
  ingresos_a_prision:Array<IngresoAPrision>;

}