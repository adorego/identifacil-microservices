import { ExisteTipoDeUsuario, ExisteTipoUsuario } from "src/frameworks/validation/typeUser-custom-validatior";
import { IsDate, IsNotEmpty, Length, MinLength, min } from "class-validator";

export class RegisterUserDto{
  @IsNotEmpty()
  ci:string;

  @IsNotEmpty()
  @MinLength(8)
  clave:string;

  @IsNotEmpty()
  @MinLength(2)
  nombre:string;

  @IsNotEmpty()
  @MinLength(2)
  apellido:string;

  @IsNotEmpty()
  @MinLength(1)
  @ExisteTipoUsuario('No existe el tipo de usuario enviado')
  tipo:string;

  

  
}