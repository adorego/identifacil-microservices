import { Autoridad } from "./autoridad.entity";
import { Chofer } from "./chofer.entity";
import { Custodia } from "./custodia.entity";
import { DocumentoDeAutorizacion } from "./documento-de-autorizacion.entity";
import { EstablecimientoPenitenciario } from "src/core/entities/establecimiento-penitenciario.entity";
import { MedidaDeSeguridad } from "./medida-de-seguridad.entity";
import { MotivoTraslado } from "./motivo-traslado.entity";
import { Persona } from "src/core/entities/persona.entity";
import { Vehiculo } from "./vehiculo.entity";

export class Traslado{
  id?:number;

  
  origen:EstablecimientoPenitenciario;

  destino:EstablecimientoPenitenciario;

  fecha:Date;

  documentoDeAutorizacion:DocumentoDeAutorizacion;

  autorizadoPor:Autoridad;

  motivo:MotivoTraslado;

  medidaDeSeguridad:MedidaDeSeguridad;

  descripcionDeMotivoDeTraslado:string;

  custodia:Custodia;

  chofer:Chofer;

  vehiculo:Vehiculo;

  ppls:Array<Persona>;


}