import { Body, Controller, Logger, Post } from "@nestjs/common";
import { RegistroEducacionDTO } from "src/core/dto/registro/registro-educacion.dto";
import { RespuestaRegistroEducacionFormacionDTO } from "src/core/dto/registro/respuesta-registro-educacionFormacion.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";


@Controller()
export class EducacionFormacionController{
  private readonly logger:Logger = new Logger('EducacionFormacionLogger');
  constructor(
    private registroPersonaUseCase:RegistroUseCase
  ){

  }

  @Post("registro_educacion")
  async registrar_educacion(@Body() registroEducacionDTO:RegistroEducacionDTO):Promise<RespuestaRegistroEducacionFormacionDTO>{
    this.logger.log('Datos recibidos:',registroEducacionDTO);
    const respuestaRegistrarEducacionUseCase = await this.registroPersonaUseCase.registrar_educacion(registroEducacionDTO);
    console.log("Respuesta Use Case:", respuestaRegistrarEducacionUseCase)
    return(
      {
        success:true
      }
    )
    
  }
}