import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";

import { IDataService } from "src/core/abstract/data-service.abstract";
import { RespuestaRegistroSaludDTO } from "src/core/dto/registro/respuesta-registro-salud.dto";
import { RegistroSaludDTO } from "src/core/dto/registro_salud/registro-salud.dto";
import { RegistroSaludFactory } from "src/use-cases/registro-datos-salud/registro-salud-factory.service";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";

@Controller('registro_salud')
export class DatosSaludController{

  constructor(
    private dataService:IDataService,
    private registroPersonaUseCase:RegistroUseCase
  ){}

  @Post()
  async create(@Body() registroSaludDTO:RegistroSaludDTO){
    try{
      const respuestaRegistroSalud:RespuestaRegistroSaludDTO = await this.registroPersonaUseCase.registrar_salud(registroSaludDTO);
      return respuestaRegistroSalud;
    }catch(error){
      throw new HttpException(`Error al crear el registro de salud:${error}`,HttpStatus.INTERNAL_SERVER_ERROR)
    }
    }
}