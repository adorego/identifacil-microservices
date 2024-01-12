import { Persona } from "./persona.entity";

export class LimitacionIdiomatica{
  id:number;
  persona:Persona;
  necesitaInterprete:boolean;
  necesitaInterprete_modificado:boolean;
  tieneDificultadParaLeerYEscribir:boolean;
  tieneDificultadParaLeerYEscribir_modificado:boolean;
  
}