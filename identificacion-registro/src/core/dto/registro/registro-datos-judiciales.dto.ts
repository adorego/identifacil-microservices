import { Oficio } from "src/core/entities/oficio.entity";

interface oficio{
  numeroDeDocumento:string;
  fechaDeDocumento:string;
  documento:File | null;

}

interface resolucion{
  numeroDeDocumento:string;
  fechaDeDocumento:string;
  documento:File | null;
}

interface expediente{
  numeroDeDocumento:string;
  fechaDeDocumento:string;
}
export class RegistroDatosJudicialesDTO{
  id_persona:number;
  establecimiento_penitenciario:number;
  primeraVezEnPrision:boolean;
  cantidadDeIngresos:number;
  fecha_ingreso_a_establecimiento:Date;
  pabellon:string;
  celda:string;
  expediente_id:number;
  oficioJudicial_numeroDeDocumento:string;
  oficioJudicial_fechaDeDocumento:Date;
  //oficioJudicial_documento
  resolucion_numeroDeDocumento:string;
  resolucion_fechaDeDocumento:Date;
  //resolucion_documento

}