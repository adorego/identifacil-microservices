import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { Persona } from "src/core/entities/persona.entity";

export class RespuestaGenerarRegistroDatosFamiliaresDTO{
  datosFamiliares:DatosFamiliares;
  persona:Persona;
}