import { ExpedienteJudicial } from "./expediente-judicial.entity";

export class DocumentoOrdenPrision{
  id:number;
  numero_documento:string;
  tipo:string;
  fecha:Date;
  causa:ExpedienteJudicial;
  ruta:string;
}