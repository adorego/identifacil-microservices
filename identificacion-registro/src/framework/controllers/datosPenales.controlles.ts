import { Body, Controller, Get, Post } from "@nestjs/common";

import { IDataService } from "src/core/abstract/data-service.abstract";
import { CausaJudicialDTO } from "src/core/dto/causa/causa.dto";
import { RespuestaCrearCausaJudicialDTO } from "src/core/dto/causa/respuesta-crear-causaJudicial.dto";
import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { DatosPenalesUseCases } from "src/use-cases/datos-penales/datos-penales-use-case.service";

@Controller('datos_penales')
export class DatosPenalesController{

  constructor(
    private datosPenalesUseCases:DatosPenalesUseCases
  ){

  }
  
  @Get('causas')
  async getCausas():Promise<Array<CausaJudicial>>{
    return await this.datosPenalesUseCases.getCausas();
  }

  @Post('causas')
  async create(@Body() causaJudicialDTO:CausaJudicialDTO):Promise<RespuestaCrearCausaJudicialDTO>{
    const respuestaCausaJudicialUseCase = await this.datosPenalesUseCases.createCausaJudicial(causaJudicialDTO);
    return{
      success:true,
      id:respuestaCausaJudicialUseCase.id
    }

  }
}