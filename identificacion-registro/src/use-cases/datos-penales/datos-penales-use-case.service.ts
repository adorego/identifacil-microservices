import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { CausaJudicialDTO } from "src/core/dto/causa/causa.dto";
import { DatosPenalesFactory } from "./datos-penales-factory.service";
import { IDataService } from "src/core/abstract/data-service.abstract";

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

  async createCausaJudicial(causaJudicialDTO:CausaJudicialDTO):Promise<CausaJudicial>{
    try{
    const respuestaGeneracionCausaJudicialFactory = await this.datosPenalesFactory.creacionDeCausaJudicialGenerar(causaJudicialDTO);
    const condenaCreada = await this.dataService.condena.create(respuestaGeneracionCausaJudicialFactory.condena);
    const causaJudicialACrear = respuestaGeneracionCausaJudicialFactory.causaJudicial;
    causaJudicialACrear.condena = condenaCreada;
    const causaJudicialCreada = await this.dataService.causas.create(causaJudicialACrear);
    return causaJudicialCreada;
    }catch(error){
        throw new HttpException(`Error al crear la causa judicial:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}