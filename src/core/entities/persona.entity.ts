import { DatosFamiliares } from "./datos-familiares.entity";
import { DatosPersonales } from "./datos-personales.entity";
import { EducacionFormacion } from "./educacion-formacion.entity";
import { Familiar } from "./familiar.entity";
import { Genero } from "./genero.entity";
import { LimitacionIdiomatica } from "./limitacion-idiomatica.entity";
import { RegistroPersona } from "./registro-persona.entity";
import { Salud } from "./salud.entity";
import { SaludFisica } from "./salud-fisica.entity";
import { SaludMental } from "./salud-mental.entity";
import { Seguridad } from "./seguridad.entity";
import { SituacionJudicial } from "./situacion-judicial.entity";
import { TipoIdentificacion } from "./tipo-identificacion.entity";

export class Persona{
  id:number;
  tipo_identificacion:TipoIdentificacion;
  numero_identificacion:string;
  tiene_cedula:boolean;
  es_extranjero:boolean;
  datosPersonales:DatosPersonales;
  esPPL:boolean;
  nombre:string;
  apellido:string;
  ci:string;
  genero:Genero;
  fechaDeNacimiento:Date;
  registro:RegistroPersona;
  salud:Salud;
  educacionFormacion:EducacionFormacion;
  seguridad:Seguridad;
  datosFamiliares:DatosFamiliares;
  situacionJudicial:SituacionJudicial;

}