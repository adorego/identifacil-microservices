import { Genero } from "../../entities/genero.entity";
import { TipoIdentificacion } from "../../entities/tipo-identificacion.entity";

export class RegistroPersonaDTO{
  nombres:string;
  apellidos:string;
  genero:string;
  fechaDeNacimiento:Date;
  tipo_identificacion:string;
  numero_identificacion:string;
  prontuario:string;
  tiene_cedula:string;
  mantiene_contacto_con_consulado_o_embajada:boolean;
  nombre_de_contacto_en_consulado_o_embajada:string;
  numero_de_contacto_en_consulado_o_embajada:string;
  pais_de_embajada:number;
  es_extranjero:string;
  foto1:File;
  descriptorFacial1:string;
  foto2:File;
  descriptorFacial2:string;
  foto3:File;
  descriptorFacial3:string;
  esPPL:string;
  establecimiento:string | null;

}