import { Causa } from "./causa-judicial.entity";

export class DocumentoOrdenPrision{
  id:number;
  numero_documento:string;
  fecha:Date;
  causa:Causa;
}