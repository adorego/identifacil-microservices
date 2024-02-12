import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { RegistroSaludDTO } from "src/core/dto/registro/registro-salud.dto";
import { RespuestaRegistroSaludDTO } from "src/core/dto/registro/respuesta-registro-salud.dto";
import { RespuestaActualizacionSaludDTO } from "src/core/dto/registro_salud/respuesta-actualizacioin-salud.dto";
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
      success:true,
      registro_salud:respuestaRegistroSalud.registro_salud
      }
  }

  @Put(':id')
  async actualizar_salud(@Param() param:any,@Body() registro_salud:RegistroSaludDTO):Promise<RespuestaActualizacionSaludDTO>{
    const respuestaActualizacionSalud = await this.registroPersonaUseCase.actualizar_salud(param.id, registro_salud);
    return{
      success:true
    }
  }
}