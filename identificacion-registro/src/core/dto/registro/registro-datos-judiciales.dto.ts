
interface oficio_tipo{
  numeroDeDocumento:string;
  fechaDeDocumento:string;
  documento:File | null;

}

interface resolucion_tipo{
  numeroDeDocumento:string;
  fechaDeDocumento:string;
  documento:File | null;
}

interface expediente_tipo{
  numeroDeDocumento:string;
  fechaDeDocumento:string;
}
export class RegistroDatosJudicialesDTO{
  numeroDeIdentificacion:string | null;
  establecimientoPenitenciario:number;
  situacionJudicial: string;
  situacionJudicial_modificado:boolean;
  primeraVezEnPrision: boolean;
  primeraVezEnPrision_modificado:boolean;
  cantidadDeIngresos: number;
  cantidadDeIngresos_modificado:boolean;
  causa: number;
  causa_modificado:boolean;
  oficio: string;
  oficio_modificado:boolean;
  ultimoTrabajo: string;
  ultimoTrabajo_modificado:boolean;
  oficioJudicial: oficio_tipo;
  oficioJudicial_modificado:boolean;
  resolucion: resolucion_tipo;
  resolucion_modificado:boolean;
  expediente: expediente_tipo;
  expediente_modificado:boolean;
  caratula: string;
  caratula_modificado:boolean;
  hechoPunible: string;
  hechoPunible_modificado:boolean;
  sentenciaDefinitiva?: string;
  sentenciaDefinitiva_modificado:boolean;
}