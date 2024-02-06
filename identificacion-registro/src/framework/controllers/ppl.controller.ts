import { Controller, Get, Param } from "@nestjs/common";

import { GestionPPLUseCase } from "src/use-cases/gestion-ppl/gestion-ppl-use-case.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplDTO } from "src/core/dto/ppl/ppl.dto";

@Controller('gestion_ppl')
export class PplController{

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

  // async ppl_por_ci(numeroDeIdentificacion:string):Promise<PplDTO>{

  // }

  // async ppl_por_nombre(nombre_y_apellido:string):Promise<Array<PplDTO>>{

  // }

}