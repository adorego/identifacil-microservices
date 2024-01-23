import { CausaJudicial } from "./causa-judicial.entity";
import { IngresoAPrision } from "./ingreso-a-prision.entity";
import { Persona } from "./persona.entity";

export class SituacionJudicial{
  id:number;
  persona:Persona;
  causas:Array<CausaJudicial>;
  primera_vez_en_prision:boolean;
  cantidad_de_veces_que_ingreso:number;
  ingresos_a_prision:Array<IngresoAPrision>;

}