import { Body, Controller, Post } from "@nestjs/common";
import { RegistroEducacionDTO } from "src/core/dto/registro-educacion.dto";
import { RespuestaRegistroEducacionFormacionDTO } from "src/core/dto/respuesta-registro-educacionFormacion.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";


@Controller()
export class EducacionFormacionController{

  constructor(
    private registroPersonaUseCase:RegistroUseCase
  ){

  }

  @Post("registro_educacion")
  async registrar_educacion(@Body() registroEducacionDTO:RegistroEducacionDTO):Promise<RespuestaRegistroEducacionFormacionDTO>{
    console.log("Datos recibidos:", registroEducacionDTO);
    const respuestaRegistrarEducacionUseCase = await this.registroPersonaUseCase.registrar_educacion(registroEducacionDTO);
    console.log("Respuesta Use Case:", respuestaRegistrarEducacionUseCase)
    return(
      {
        success:true
      }
    )
    
  }
}