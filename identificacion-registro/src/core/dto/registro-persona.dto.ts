import { Genero } from "../entities/genero.entity";
import { TipoIdentificacion } from "../entities/tipo-identificacion.entity";

export class RegistroPersonaDTO{
  nombres:string;
  apellidos:string;
  genero:string;
  fechaDeNacimiento:Date;
  tipo_identificacion:string;
  numero_identificacion:string;
  foto1:File;
  descriptorFacial1:string;
  foto2:File;
  descriptorFacial2:string;
  foto3:File;
  descriptorFacial3:string;

}