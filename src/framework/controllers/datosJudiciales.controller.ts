import { Body, Controller, Logger, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { RegistroDatosJudicialesDTO } from "src/core/dto/registro-datos-judiciales.dto";
import { RespuestaRegistroDatosJudicialesDTO } from "src/core/dto/respuesta-registro-datos-judiciales.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";

@Controller(
  'registro'
)
export class DatosJudicialesController{
  private readonly logger = new Logger('DatosJudicialesController')
  constructor(
    private registroPersonaUseCase:RegistroUseCase
  ){

  }

  @Post('datos_judiciales')
  @UseInterceptors(
    FileFieldsInterceptor([
      {name:'oficioJudicial_documento', maxCount:1},
      {name:'resolucion_documento', maxCount:1},
      
    ])
  )
  async create(@UploadedFiles() documentos: {
    oficioJudicial_documento: Array<Express.Multer.File>, 
    resolucion_documento: Array<Express.Multer.File>},
    @Body() registroDatosJudiciales:RegistroDatosJudicialesDTO):Promise<RespuestaRegistroDatosJudicialesDTO>{
    this.logger.log("Datos recibidos:", registroDatosJudiciales, 'metodo:create');
    this.registroPersonaUseCase.registrar_datos_judiciales(registroDatosJudiciales,documentos.oficioJudicial_documento, documentos.resolucion_documento)
    
    return(
      {
        success:true,
      }
    )
  }

}