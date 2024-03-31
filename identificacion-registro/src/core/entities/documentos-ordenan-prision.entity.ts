import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { IngresoAPrision } from "./ingreso-a-prision.entity";

export class DocumentoOrdenPrision{
  id:number;
  numero_documento:string;
  tipo:string;
  fecha:Date;
  expediente:ExpedienteJudicial;
  ruta:string;
  ingreso_a_prision:IngresoAPrision
}