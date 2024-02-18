import { Body, Controller, Logger, Param, Post, Put } from "@nestjs/common";
import { RegistroDatosSeguridadDTO } from "src/core/dto/registro_seguridad/registro-datos-seguridad.dto";
import { RespuestaRegistroDatosSeguridadDTO } from "src/core/dto/registro_seguridad/respuesta-registro-seguridad.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";


@Controller(
  'seguridad'
)
export class DatosSeguridadController{
  private readonly logger = new Logger('DatosSeguridadController');
  constructor(
    private registroPersonaUseCase:RegistroUseCase
  ){}

  @Post()
  async create(@Body() registroDatosSeguridad:RegistroDatosSeguridadDTO):Promise<RespuestaRegistroDatosSeguridadDTO>{
    this.logger.log("Datos enviado:", registroDatosSeguridad, 'metodo:create');
    const respuestaSeguridad = await this.registroPersonaUseCase.registrar_datos_seguridad(registroDatosSeguridad);
    return(
      {
        success:true,
        id:respuestaSeguridad.id
      }
    )
  }

  @Put(':id')
  async update(@Param() param:any, datosSeguridadDTO:RegistroDatosSeguridadDTO){
    this.logger.log("Datos enviado:", datosSeguridadDTO, 'metodo:update');
    const registroDeSeguridadActualizado = await this.registroPersonaUseCase.actualizar_datos_seguridad(param.id,datosSeguridadDTO);
    return{
      success:true,
      registroActualizado:registroDeSeguridadActualizado
    }
  }
}