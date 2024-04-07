import { isString } from "class-validator";

export class RegistroDatosPersonalesDTO{
  id_persona:number|null;
  apodo: string;
  apodo_modificado:boolean;
  estadoCivil: number;
  estadoCivil_modificado:boolean;
  fechaDeNacimiento: Date;
  fechaDeNacimiento_modificado:boolean;
  nacionalidad: number;
  nacionalidad_modificado:boolean;
  lugarDeNacimiento: string;
  lugarDeNacimiento_modificado:boolean;
  tipoDeDocumento: string;
  tipoDeDocumento_modificado:boolean;
  direccion: string;
  direccion_modificado:boolean;
  barrioCompania: string;
  barrioCompania_modificado:boolean;
  numeroDeContacto: string;
  numeroDeContacto_modificado:boolean;
  contactoDeEmergencia1: string;
  contactoDeEmergencia1_modificado:boolean;
  contactoDeEmergencia2: string;
  contactoDeEmergencia2_modificado:boolean;
  pueblosIndigenas: boolean;
  pueblosIndigenas_modificado:boolean;
  nombreEtnia: string;
  nombreEtnia_modificado:boolean;
  perteneceAComunidadLGTBI:boolean;
  perteneceAComunidadLGTBI_modificado:boolean;
  grupoLgbti: string;
  grupoLgbti_modificado:boolean;
  es_extranjero:boolean;
  tiene_contacto_en_embajada:boolean;
  nombre_contacto_en_embajada:string;
  telefono_contacto_en_embajada:string;
  pais_embajada:number;
}

  