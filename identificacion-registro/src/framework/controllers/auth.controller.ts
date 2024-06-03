import { Body, Controller, Logger, Param, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CredencialesDTO } from "src/core/dto/security/credenciales.dto";
import { PermisoDTO } from "src/core/dto/security/permiso.dto";
import { RegistroUsuarioDTO } from "src/core/dto/security/register-user.dto";
import { RolDTO } from "src/core/dto/security/rol.dto";
import { UsuarioDTO } from "src/core/dto/security/usario.dto";
import { AuthUseCases } from "src/use-cases/security/auth-use-case.service";


@Controller('auth')
export class AuthController{
  private readonly logger = new Logger("AuthController");
  private client:ClientProxy;

  constructor(
      private authUseCasesService:AuthUseCases
    ){
    //   this.client = ClientProxyFactory.create({
    //     transport: Transport.NATS,
    //     options:{
    //       url: 'nats://localhost:4222',
    //     }
    //   })
    }

  
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
  this.client.emit('rol_created', resultado.id)
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
  this.client.emit('user_authenticated', {id:respuestaLogin.id_usuario})
  return{
    access_token:respuestaLogin.access_token
  }
}

@Post('logout')
async logout(){
  return "ok"
}

  
}