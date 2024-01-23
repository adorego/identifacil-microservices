import { Body, Controller, Post } from "@nestjs/common";
import { IdentificacionPersonaDTO } from "src/core/dto/identificacion-persona.dto";
import { IdentificacionRespuestaDTO } from "src/core/dto/identificacion-respuesta.dto";
import { IdentificacionUseCase } from "src/use-cases/identificacion-use-case.service";

// import { IdentificacionUseCase } from "src/use-cases/identificacion-use-case.service";

@Controller('identificacion')
export class IdentificacionController{


  constructor(
    private identificacionPersonaUseCase:IdentificacionUseCase
  ){

  }

  @Post()
  async identificar(@Body() descriptor_a_identificar:IdentificacionPersonaDTO){
    // console.log("Descriptor recibido:", descriptor_a_identificar.descriptorFacial);
    const persona_encontrada = await this.identificacionPersonaUseCase.identificar(descriptor_a_identificar.descriptorFacial);
    return(persona_encontrada);
  }
}