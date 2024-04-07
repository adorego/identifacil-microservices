import { ContactoEnEmbajada } from "src/core/entities/contacto_embajada.entity";
import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { EstadoCivil } from "src/core/entities/estado-civil.entity";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { Persona } from "src/core/entities/persona.entity";
import { ContactoDeEmbajadaModel } from "src/framework/data-service/postgres/models/contacto_embajada.model";

export class RespuestaDatosPersonalesDTO{
  datosPersonales:DatosPersonales;
  nacionalidad:Nacionalidad;
  estado_civil:EstadoCivil;
  persona:Persona;
  contactoEnEmbajada:ContactoEnEmbajada;
}