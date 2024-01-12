import { Barrio } from "./barrio.entity";
import { Compania } from "./compania.entity";
import { EstadoCivil } from "./estado-civil.entity";
import { Nacionalidad } from "./nacionalidad";
import { Persona } from "./persona.entity";

export class DatosPersonales{
  id:number;
  persona:Persona;
  apodo:string;
  apodo_modificado:boolean;
  estado_civil:EstadoCivil;
  estadoCivil_modificado:boolean;
  nacionalidad:Nacionalidad;
  nacionalidad_modificado:boolean;
  lugarDeNacimiento:Date;
  lugarDeNacimiento_modificado:boolean;
  direccion:string;
  direccion_modificado:boolean;
  barrio:Barrio;
  barrio_modificado:boolean;
  compania:Compania;
  compania_modificado:boolean;
  numeroDeContacto:string;
  numeroDeContacto_modificado:boolean;
  contactoDeEmergencia1:string;
  contactoDeEmergencia1_modificado:boolean;
  contactoDeEmergencia2:string;
  contactoDeEmergencia2_modificado:boolean;
  pueblosIndigenas:boolean;
  pueblosIndigenas_modificado:boolean;
  nombreEtnia:string;
  nombreEtnia_modificado:boolean;
  perteneceAComunidadLGTBI:boolean;
  perteneceAComunidadLGTBI_modificado:boolean;
  
  
  
}