import { CausaJudicial } from "./causa-judicial.entity";
import { DocumentoOrdenPrision } from "./documentos-ordenan-prision.entity";
import { EstablecimientoPenitenciario } from "./establecimiento-penitenciario.entity";

export class IngresoAPrision{
  id:number;
  causa:CausaJudicial;
  documento_que_ordenan_prision:Array<DocumentoOrdenPrision>;
  fecha_ingreso:Date;
  fecha_de_salida:Date;
  establecimiento_penitenciario:EstablecimientoPenitenciario;

}