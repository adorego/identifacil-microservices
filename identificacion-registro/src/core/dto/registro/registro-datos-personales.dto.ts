
export class RegistroDatosPersonalesDTO{
  id_persona:number|null;
  departamento:number;
  ciudad:number;
  apodo: string;
  estadoCivil: number;
  fechaDeNacimiento: Date;
  nacionalidad: number;
  lugarDeNacimiento: string;
  direccion: string;
  barrioCompania: string;
  numeroDeContacto: string;
  contactoDeEmergencia1: string;
  contactoDeEmergencia2: string;
  pueblosIndigenas: boolean;
  nombreEtnia: string;
  perteneceAComunidadLGTBI:boolean;
  grupoLgbti: string;
  tiene_contacto_en_embajada:boolean;
  nombre_contacto_en_embajada:string;
  telefono_contacto_en_embajada:string;
  pais_embajada:number;
}

  