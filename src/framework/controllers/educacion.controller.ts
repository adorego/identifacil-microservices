import { Body, Controller, Logger, Param, Post, Put } from "@nestjs/common";
import { RegistroEducacionDTO } from "src/core/dto/registro/registro-educacion.dto";
import { RespuestaRegistroEducacionFormacionDTO } from "src/core/dto/registro/respuesta-registro-educacionFormacion.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";


@Controller('educacion')
export class EducacionFormacionController{
  private readonly logger:Logger = new Logger('EducacionFormacionLogger');
  constructor(
    private registroPersonaUseCase:RegistroUseCase
  ){

  }

  @Post()
  async registrar_educacion(@Body() registroEducacionDTO:RegistroEducacionDTO):Promise<RespuestaRegistroEducacionFormacionDTO>{
    this.logger.log('Datos recibidos:',registroEducacionDTO);
    const respuestaRegistrarEducacionUseCase = await this.registroPersonaUseCase.registrar_educacion(registroEducacionDTO);
    console.log("Respuesta Use Case:", respuestaRegistrarEducacionUseCase)
    return(
      {
        success:true,
        id:respuestaRegistrarEducacionUseCase.id
      }
    )
    
  }

  @Put(':id')
  async actualizar_educacion(@Param() param, @Body() registroEducacionDTO):Promise<RespuestaRegistroEducacionFormacionDTO>{
    this.logger.log('Datos recibidos:',registroEducacionDTO);
    const respuestaActualizarEducacionCase = await this.registroPersonaUseCase.actualizar_educacion(param.id,registroEducacionDTO);
    return(
      {
        success:true,
        id:respuestaActualizarEducacionCase.id
      }
    )
  }
}