import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { EducacionFormacion } from "src/core/entities/educacion-formacion.entity";
import { LimitacionIdiomatica } from "src/core/entities/limitacion-idiomatica.entity";
import { Salud } from "src/core/entities/salud.entity";
import { SaludFisica } from "src/core/entities/salud-fisica.entity";
import { SaludMental } from "src/core/entities/salud-mental.entity";
import { Seguridad } from "src/core/entities/seguridad.entity";
import { SituacionJudicial } from "src/core/entities/situacion-judicial.entity";
import { TipoIdentificacion } from "src/core/entities/tipo-identificacion.entity";
import { ContactoEnEmbajada } from "src/core/entities/contacto_embajada.entity";

export class PplDTO{
  id_persona:number;
  nombre:string;
  apellido:string;
  tipo_de_documento:TipoIdentificacion;
  numero_de_identificacion:string;
  establecimiento:number;
  establecimiento_nombre:string;
  foto:string;
  registro_de_fotos:Array<{nombre:string,foto:string}>;
  tiene_contacto_en_embajada:boolean;
  // nacionalidad:number;
  es_extranjero:boolean;
  apodo:string;
  genero:number;
  fechaDeNacimiento:Date;
  estado_perfil:boolean;
  datosPersonales:DatosPersonales;
  datosDeSalud:Salud;
  datosDeSeguridad:Seguridad;
  datosFamiliares:DatosFamiliares;
  datosJudiciales:SituacionJudicial;
  datosEducacion:EducacionFormacion;
  contactoDeEmbajada:ContactoEnEmbajada;

}