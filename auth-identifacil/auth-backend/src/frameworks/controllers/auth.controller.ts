import { Body, Controller, Get, Logger, Param, Post, Put } from "@nestjs/common";
import { RegistroUsuarioDTO } from "src/core/dtos/register-user.dto";
import { RegisteredUserResponseDto } from "src/core/dtos/register-user-response.dto";
import { AuthUseCases } from "src/use-cases/auth-use-case.service";
import { UsuarioDTO } from "src/core/dtos/usario.dto";
import { RolDTO } from "src/core/dtos/rol.dto";
import { PermisoDTO } from "src/core/dtos/permiso.dto";
import { CredencialesDTO } from "src/core/dtos/credenciales.dto";


@Controller('api/auth')
export class AuthController{
  private readonly logger = new Logger("AuthController");
  constructor(
      private authUseCasesService:AuthUseCases
    ){}

  
  @Post('registro')
  async registrar(@Body() registroDTO:RegistroUsuarioDTO){
    const usuarioDTO = new UsuarioDTO();
    usuarioDTO.nombres = registroDTO.nombres;
    usuarioDTO.apellidos = registroDTO.apellidos;
    usuarioDTO.ci = registroDTO.ci;
    usuarioDTO.clave = registroDTO.clave;

    const respuestaCrearUsuario = await this.authUseCasesService.createUser(usuarioDTO,registroDTO.roles);
    return{
      id:respuestaCrearUsuario.id,
      success:true
    }
  }

@Post('rol')
async crearRol(@Body() rolDTO:RolDTO){
  const resultado  = await this.authUseCasesService.createRol(rolDTO);
  return{
    success:true,
    id:resultado.id
  }
}

@Put("rol/:id")
async updateRol(@Param() param:any, @Body() rolDTO:RolDTO){
  const resultado = await this.authUseCasesService.updateRol(param.id,rolDTO);
  return{
    success:true,
    id:resultado.id
  }
}

@Post('permiso')
async crearPermiso(@Body() permisosDTO:Array<PermisoDTO>){
  this.logger.log("Llamada a crearPermiso");
  const resultado = await this.authUseCasesService.createPermiso(permisosDTO);
  return{
    success:true,
    permisos:resultado.permisos
  }
}

@Post('login')
async login(@Body() credencialesDTO:CredencialesDTO){
  const respuestaLogin = await this.authUseCasesService.login(credencialesDTO.ci, credencialesDTO.clave);
  return{
    access_token:respuestaLogin.access_token
  }
}

  
}