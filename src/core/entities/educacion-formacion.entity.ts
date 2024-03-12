import { Persona } from "./persona.entity";

export class EducacionFormacion{
  id?:number;
  persona:Persona;
  nivelAcademico: string;
  nivelAcademico_modificado:boolean;
  institucionEducativa: string;
  institucionEducativa_modificado:boolean;
  tieneOficio: boolean;
  tieneOficio_modificado:boolean;
  nombreOficio: string;
  nombreOficio_modificado:boolean;
  ultimoTrabajo: string;
  ultimoTrabajo_modificado:boolean;
 
}