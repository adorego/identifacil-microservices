import { Genero } from "./genero.entity";
import { RegistroPersona } from "./registro-persona.entity";
import { TipoIdentificacion } from "./tipo-identificacion.entity";

export class Persona{
  id:number;
  tipo_identificacion:TipoIdentificacion;
  numero_identificacion:string;
  nombre:string;
  apellido:string;
  ci:string;
  genero:Genero;
  fechaDeNacimiento:Date;
  registro:RegistroPersona;
}