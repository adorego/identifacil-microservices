import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { LimitacionIdiomatica } from "src/core/entities/limitacion-idiomatica.entity";
import { Salud } from "src/core/entities/salud.entity";
import { SaludFisica } from "src/core/entities/salud-fisica.entity";
import { SaludMental } from "src/core/entities/salud-mental.entity";
import { Seguridad } from "src/core/entities/seguridad.entity";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";

export class PplDTO{
  id_persona:number;
  nombre:string;
  apellido:string;
  numero_de_identificacion:string;
  establecimiento:number;
  establecimiento_nombre:string;
  // nacionalidad:number;
  apodo:string;
  genero:number;
  fechaDeNacimiento:Date;
  estado_perfil:boolean;
  datosPersonales:DatosPersonales;
  datosDeSalud:Salud;
  datosDeSaludMental:SaludMental;
  datosDeSaludFisica:SaludFisica;
  datosLimitacionesIdiomaticas:LimitacionIdiomatica;
  datosDeSeguridad:Seguridad;
  datosFamiliares:DatosFamiliares;
  datosJudiciales:SituacionJudicial;

}