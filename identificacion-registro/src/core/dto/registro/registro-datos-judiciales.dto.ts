
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
  oficioJudicial: oficio;
  oficioJudicial_modificado:boolean;
  resolucion: resolucion;
  resolucion_modificado:boolean;
  expediente: expediente;
  expediente_modificado:boolean;
  caratula: string;
  caratula_modificado:boolean;
  hechoPunible: string;
  hechoPunible_modificado:boolean;
  sentenciaDefinitiva?: string;
  sentenciaDefinitiva_modificado:boolean;
}