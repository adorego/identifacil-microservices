import { Genero } from "../entities/genero.entity";
import { TipoIdentificacion } from "../entities/tipo-identificacion.entity";

export class RegistroPersonaDTO{
  nombre:string;
  apellido:string;
  genero:Genero;
  fechaDeNacimiento:Date;
  tipo_identificacion:TipoIdentificacion;
  numero_identificacion:string;
  foto1:File;
  descriptorFacial1:Array<Number>;
  foto2:File;
  descriptorFacial2:Array<Number>;
  foto3:File;
  descriptorFacial3:Array<Number>;

}