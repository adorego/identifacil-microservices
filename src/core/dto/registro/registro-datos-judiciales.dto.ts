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
  establecimientoPenitenciario:number;
  situacionJudicial: string;
  situacionJudicial_modificado:boolean;
  primeraVezEnPrision: boolean;
  primeraVezEnPrision_modificado:boolean;
  cantidadDeIngresos: number;
  cantidadDeIngresos_modificado:boolean;
  fecha_ingreso_a_establecimiento:Date;
  causa: number;
  causa_modificado:boolean;
  
  oficioJudicial_numeroDeDocumento:string;
  oficioJudicial_fechaDeDocumento:Date;
  oficioJudicial_modificado:boolean;
  
  
  resolucion_numeroDeDocumento:string;
  resolucion_fechaDeDocumento:Date;
  resolucion_modificado:boolean;
  
 
  expediente_numeroDeDocumento:string;
  expediente_fechaDeDocumento:Date;
  expediente_modificado:boolean;
  caratula: string;
  caratula_modificado:boolean;
  hechoPunible: number;
  hechoPunible_modificado:boolean;
  sentenciaDefinitiva?: string;
  sentenciaDefinitiva_modificado:boolean;
}