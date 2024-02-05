import { CausaJudicial } from "./causa-judicial.entity";

export class DocumentoOrdenPrision{
  id:number;
  numero_documento:string;
  fecha:Date;
  causa:CausaJudicial;
  ruta:string;
}