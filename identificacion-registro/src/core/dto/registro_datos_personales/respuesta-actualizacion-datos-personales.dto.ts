import { DatosPersonales } from "src/core/entities/datos-personales.entity";

export class RespuestaActualizacionDatosPersonalesDTO{
  datosPersonalesActualizados:DatosPersonales;
  success:boolean;
}