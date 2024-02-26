import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { EstadoCivil } from "src/core/entities/estado-civil.entity";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { Persona } from "src/core/entities/persona.entity";

export class RespuestaDatosPersonalesDTO{
  datosPersonales:DatosPersonales;
  nacionalidad:Nacionalidad;
  estado_civil:EstadoCivil;
  persona:Persona;
}