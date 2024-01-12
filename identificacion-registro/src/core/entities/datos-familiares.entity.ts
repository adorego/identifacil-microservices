import { Familiar } from "./familiar.entity";
import { Hijo } from "./hijo-persona.entity";

export class DatosFamiliares{
  id:number;
  es_cabeza_de_familia:boolean;
  familiares:Familiar[];
  tiene_concubino:boolean;
  hijos:Array<Hijo>;
  
  
}