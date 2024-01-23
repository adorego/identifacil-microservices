import { Body, Controller, Logger, Post } from "@nestjs/common";
import { RegistroDatosFamiliaresDTO } from "src/core/dto/registro_familiar/registro-datos-familiares.dto";
import { RespuestaRegistrarDatosFamiliaresDTO } from "src/core/dto/registro_familiar/respuesta-registrar-datos-familiares.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";


@Controller(
  'registro'
)
export class DatosFamiliaresController{
  private readonly logger = new Logger('DatosFamiliaresController');
  constructor(
    private registroPersonaUseCase:RegistroUseCase
  ){}

  @Post('datos_familiares')
  async create(@Body() registroDatosFamiliares:RegistroDatosFamiliaresDTO):Promise<RespuestaRegistrarDatosFamiliaresDTO>{
    this.logger.log("Datos enviado:", registroDatosFamiliares, 'metodo:create');
    await this.registroPersonaUseCase.registrar_datos_familiares(registroDatosFamiliares);
    return(
      {
        success:true,
      }
    )
  }
}