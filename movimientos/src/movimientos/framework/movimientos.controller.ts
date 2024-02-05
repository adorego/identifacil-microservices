import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";

import { AbmMovimientosUseCase } from "../use-cases/abm-movimientos";
import { TrasladoDTO } from "../core/dto/traslado-dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller('movimientos')
export class MovimientosController{
  constructor(
    private movimientosUseCases:AbmMovimientosUseCase
  ){

  }

  @Get()
  getAll(){
    return "get all movimientos"
  }

  @Get('traslados')
  async getAllTraslados(){
    return await this.movimientosUseCases.obtener_traslados();
  }

  @Post('traslados')
  @UseInterceptors(
    FileFieldsInterceptor([
      {name:'documentoDeTraslado', maxCount:1}
    ])
  )
  async create(@UploadedFiles() documento:{
    documentoDeTraslado:Array<Express.Multer.File>
  },
  @Body() datosDeTraslado:TrasladoDTO){
    
  }

}