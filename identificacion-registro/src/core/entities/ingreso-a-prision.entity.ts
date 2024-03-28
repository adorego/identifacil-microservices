import { ExpedienteJudicial } from "./expediente-judicial.entity";
import { DocumentoOrdenPrision } from "./documentos-ordenan-prision.entity";
import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";
import { SituacionJudicial } from "./situacion-judicial.entity";

export class IngresoAPrision{
  id:number;
  expedienteJudicial:ExpedienteJudicial;
  documentos_que_ordenan_prision:Array<DocumentoOrdenPrision>;
  fecha_ingreso:Date;
  fecha_de_salida:Date;
  establecimiento_penitenciario:EstablecimientoPenitenciario;
  pabellon:string;
  celda:string;
  situacionJudicial:SituacionJudicial;

}