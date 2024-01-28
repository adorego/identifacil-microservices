
interface DocumentoDeAutorizacionDTO{
  archivo:File;
  fecha:Date;


}
export class TrasladoDTO{

  origen:number;

  destino:number;

  fecha:Date;

  documentoDeAutorizacion:DocumentoDeAutorizacionDTO;

  autorizadoPor:number;

  motivo:number;

  medidaDeSeguridad:number;

  descripcionDeMotivoDeTraslado:string;

  custodia:number;

  chofer:number;

  vehiculo:number;

  ppls:Array<number>;
}