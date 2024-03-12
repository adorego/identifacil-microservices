import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { IdentificacionPersonaDTO } from "src/core/dto/identificacion-persona.dto";
import { IdentificacionRespuestaDTO } from "src/core/dto/identificacion-respuesta.dto";
import { RespuestaIdentificacionPPLDTO } from "src/core/dto/identificacion/respuesta-identificacion-ppl.dto";
import { IdentificacionUseCase } from "src/use-cases/identificacion/identificacion-use-case.service";

// import { IdentificacionUseCase } from "src/use-cases/identificacion-use-case.service";

// @Controller('identificacion')
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

  @Post('ppl_con_cedula')
  async identificarPPLConCedula(@Body() numeroDeIdentificacion:string):Promise<RespuestaIdentificacionPPLDTO>{
    const ppl_encontrado = await this.identificacionPersonaUseCase.identificarPPLConCedula(numeroDeIdentificacion);
    if(!ppl_encontrado){
      throw new HttpException(`El PPL no existe`, HttpStatus.BAD_REQUEST);
    }
    return{
      success:true,
      nombres:ppl_encontrado.nombre,
      apellidos:ppl_encontrado.apellido
    }
  }
}