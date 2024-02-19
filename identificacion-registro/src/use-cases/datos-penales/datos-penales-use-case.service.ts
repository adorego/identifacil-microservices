import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { CausaJudicialDTO } from "src/core/dto/causa/causa.dto";
import { DatosPenalesFactory } from "./datos-penales-factory.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RespuestaCrearCausaJudicialDTO } from "src/core/dto/causa/respuesta-crear-causaJudicial.dto";

@Injectable()
export class DatosPenalesUseCases{
  constructor(
    private dataService:IDataService,
    private datosPenalesFactory:DatosPenalesFactory
  ){

  }
  async getCausas():Promise<CausaJudicial[]>{
    return await this.dataService.causas.getAll();
  }

  async createCausaJudicial(causaJudicialDTO:CausaJudicialDTO):Promise<RespuestaCrearCausaJudicialDTO>{
    try{
    const respuestaGeneracionCausaJudicialFactory = await this.datosPenalesFactory.creacionDeCausaJudicialGenerar(causaJudicialDTO);
    const causaJudicialACrear = respuestaGeneracionCausaJudicialFactory.causaJudicial;
    const causaJudicialCreada = await this.dataService.causas.create(causaJudicialACrear);
    return {
      success:true,
      id:causaJudicialACrear.id
    }
    }catch(error){
        throw new HttpException(`Error al crear la causa judicial:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}