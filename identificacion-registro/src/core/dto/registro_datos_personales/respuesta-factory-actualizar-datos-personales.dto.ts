import { ContactoEnEmbajada } from "src/core/entities/contacto_embajada.entity";
import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { EstadoCivil } from "src/core/entities/estado-civil.entity";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { Persona } from "src/core/entities/persona.entity";

export class RespuestaFactoryActualizarDatosPersonales{
  datosPersonales:DatosPersonales;
  estado_civil:EstadoCivil;
  nacionalidad:Nacionalidad;
  contactoEnEmbajada:ContactoEnEmbajada;
  persona:Persona;

}