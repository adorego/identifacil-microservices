import { Controller, Get, HttpException, Logger, Param } from "@nestjs/common";

import { GestionPPLUseCase } from "src/use-cases/gestion-ppl/gestion-ppl-use-case.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplDTO } from "src/core/dto/ppl/ppl.dto";

@Controller('gestion_ppl')
export class PplController{
  private readonly logger:Logger = new Logger("PplController");

  constructor(
    private gestionPPLUseCase:GestionPPLUseCase
  ){

  }
  @Get('ppls')
  async ppls():Promise<Array<PplDTO>>{
    return await this.gestionPPLUseCase.getAllPpls();
    
    
  
  }
  @Get('ppls/establecimiento/:establecimiento')
  async ppls_por_establecimiento(@Param() param:any):Promise<Array<PplDTO>>{
    console.log("Establecimiento:", param.establecimiento);
    return await this.gestionPPLUseCase.getPPLsByEstablecimiento(param.establecimiento);
    
    
  
  }

  @Get('ppls/cedula/:cedula')
  async ppls_por_cedula(@Param() param:any):Promise<PplDTO>{
    console.log("Cedula:", param.cedula);
    return await this.gestionPPLUseCase.getPPLByCedula(param.cedula);
    
    
  
  }

  @Get("ppls/:id")
  async ppls_por_id(@Param() param:any):Promise<PplDTO>{
    try{
      this.logger.log("Lamada a ppl_por_id, parametro:", param.id);
      return await this.gestionPPLUseCase.getPpplById(param.id);
    }catch(error){
      this.logger.error("Error en la consulta de PPL por id");
      throw new HttpException("Error en al consulta por id", error);
    }
  }

}