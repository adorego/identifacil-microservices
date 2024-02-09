import { Concubino } from "src/core/entities/concubino.entity";
import { Familiar } from "src/core/entities/familiar.entity";

export class RegistroDatosFamiliaresDTO{
  id_persona:number|null;
  esCabezaDeFamilia:boolean;
  esCabezaDeFamilia_modificado:boolean;
  tieneCirculoFamiliar:boolean;
  tieneCirculoFamiliar_modificado:boolean;
  familiares:Array<Familiar>;
  familiares_modificado:boolean;
  tieneConcubino:boolean;
  tieneConcubino_modificado:boolean;
  concubino:Concubino;
  concubino_modificado:boolean;
}