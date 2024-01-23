import { Body, Controller, Logger, Post } from "@nestjs/common";
import { RegistroDatosSeguridadDTO } from "src/core/dto/registro_seguridad/registro-datos-seguridad.dto";
import { RespuestaRegistroDatosSeguridadDTO } from "src/core/dto/registro_seguridad/respuesta-registro-seguridad.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";


@Controller(
  'registro'
)
export class DatosSeguridadController{
  private readonly logger = new Logger('DatosSeguridadController');
  constructor(
    private registroPersonaUseCase:RegistroUseCase
  ){}

  @Post('datos_seguridad')
  async create(@Body() registroDatosSeguridad:RegistroDatosSeguridadDTO):Promise<RespuestaRegistroDatosSeguridadDTO>{
    this.logger.log("Datos enviado:", registroDatosSeguridad, 'metodo:create');
    // await this.registroPersonaUseCase.registrar_datos_seguridad(registroDatosSeguridad);
    return(
      {
        success:true,
      }
    )
  }
}