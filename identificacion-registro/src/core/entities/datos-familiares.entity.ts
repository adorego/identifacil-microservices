import { Concubino } from "./concubino.entity";
import { Familiar } from "./familiar.entity";
import { Hijo } from "./hijo-persona.entity";
import { Persona } from "./persona.entity";

export class DatosFamiliares{
  id?:number;
  persona:Persona;
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
  concubinos_anteriores:Array<Concubino>;
  
  
}