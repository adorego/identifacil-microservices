import { IsAlpha, IsDate, IsNotEmpty, IsString, Length, max } from "class-validator";

import { Genero } from "src/core/entities/genero.entity";
import { RegistroPersonaDTO } from "src/core/dto/registro-persona.dto";
import { TipoIdentificacion } from "src/core/entities/tipo-identificacion.entity";

class RegistroPersonaClassValidator extends RegistroPersonaDTO{
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @Length(4, 100)
  nombre:string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @Length(4, 100)
  apellido:string;

  genero:Genero;
  
  @IsDate()
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