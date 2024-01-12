import { DocumentoOrdenPrision } from "./documentos-ordenan-prision.entity";
import { SituacionJudicial } from "./situacion-judicial-persona.entity";

export class Causa{
  id:number;
  caratula_causa:string;
  juzgado:string;
  situacion_judicial:SituacionJudicial;
  documentos_ordenan_prision:DocumentoOrdenPrision;
  
}