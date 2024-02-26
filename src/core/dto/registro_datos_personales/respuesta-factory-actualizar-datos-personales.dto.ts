import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { EstadoCivil } from "src/core/entities/estado-civil.entity";
import { Nacionalidad } from "src/core/entities/nacionalidad";

export class RespuestaFactoryActualizarDatosPersonales{
  datosPersonales:DatosPersonales;
  estado_civil:EstadoCivil;
  nacionalidad:Nacionalidad;

}