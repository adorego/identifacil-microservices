import { Concubino } from "src/core/entities/concubino.entity";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { Familiar } from "src/core/entities/familiar.entity";
import { Persona } from "src/core/entities/persona.entity";

export class RespuestaGenerarRegistroDatosFamiliaresDTO{
  datosFamiliares:DatosFamiliares;
  concubino:Concubino;
  familiares:Array<Familiar>;
  persona:Persona;
  
}