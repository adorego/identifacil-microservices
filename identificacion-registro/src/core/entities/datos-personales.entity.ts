import { Ciudad } from "./ciudad.entity";
import { Departamento } from "./departamento.entity";
import { EstadoCivil } from "./estado-civil.entity";
import { Nacionalidad } from "./nacionalidad";
import { Persona } from "./persona.entity";

export class DatosPersonales{
  id?:number;
  persona:Persona;
  apodo:string;
  estadoCivil:EstadoCivil;
  nacionalidad:Nacionalidad;
  lugarDeNacimiento:string;
  direccion:string;
  direccion_modificado:boolean;
  barrioCompania:string;
  departamento:Departamento;
  ciudad:Ciudad;
  numeroDeContacto:string;
  contactoDeEmergencia1:string;
  contactoDeEmergencia2:string;
  pueblosIndigenas:boolean;
  nombreEtnia:string;
  perteneceAComunidadLGTBI:boolean;
  
  
  
  
}