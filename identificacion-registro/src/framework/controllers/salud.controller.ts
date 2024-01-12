import { Body, Controller, Post } from "@nestjs/common";
import { RegistroSaludDTO } from "src/core/dto/registro-salud.dto";
import { RespuestaRegistroSaludDTO } from "src/core/dto/respuesta-registro-salud.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";

@Controller('salud')
export class SaludController{
  
  constructor(
    private registroPersonaUseCase:RegistroUseCase,
    
  ){}
  @Post()
  async create(@Body() registro_salud:RegistroSaludDTO):Promise<RespuestaRegistroSaludDTO>{
    const respuestaRegistroSalud =  await this.registroPersonaUseCase.registrar_salud(registro_salud);
    return {
      success:true
      }
  }
}