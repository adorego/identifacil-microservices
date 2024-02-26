import { Body, Controller, HttpException, HttpStatus, Logger, Param, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { RegistroDatosJudicialesDTO } from "src/core/dto/registro/registro-datos-judiciales.dto";
import { RespuestaRegistroDatosJudicialesDTO } from "src/core/dto/registro/respuesta-registro-datos-judiciales.dto";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";

@Controller(
  'datos_judiciales'
)
export class DatosJudicialesController{
  private readonly logger = new Logger('DatosJudicialesController')
  constructor(
    private registroPersonaUseCase:RegistroUseCase
  ){

  }

  @Post()
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
      try{
        this.logger.log("Datos recibidos:", registroDatosJudiciales, 'metodo:create');
        //this.logger.log("Documentos recibidos:", documentos);
        const respuesta_registro_datos_judiciales = 
        await this.registroPersonaUseCase.registrar_datos_judiciales(registroDatosJudiciales,documentos.oficioJudicial_documento, documentos.resolucion_documento)
        
        return(
          {
            id: respuesta_registro_datos_judiciales.id,
            success:true,
          }
        )
      }catch(error){
          this.logger.error(`Error durante la creación de datos judiciales:${error}`);
          throw new HttpException(`Error durante la actualizacion de datos judiciales:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
      } 
    }
    
  

      @Put(':id')
      @UseInterceptors(
        FileFieldsInterceptor([
          {name:'oficioJudicial_documento', maxCount:1},
          {name:'resolucion_documento', maxCount:1},
        ])
      )
      async update(@UploadedFiles() documentos:{
        oficioJudicial_documento: Array<Express.Multer.File>, 
        resolucion_documento: Array<Express.Multer.File>},
        @Param() param:any,
        @Body() registroDatosJudicialesDTO:RegistroDatosJudicialesDTO):Promise<RespuestaRegistroDatosJudicialesDTO>{
          try{
            this.logger.log("Datos recibidos:", registroDatosJudicialesDTO, 'metodo:update');
            const respuestaActualizarDatosJudiciales = await this.registroPersonaUseCase.actualizar_datos_judiciales(param.id,registroDatosJudicialesDTO,documentos.oficioJudicial_documento, documentos.resolucion_documento);
            return{
              id:respuestaActualizarDatosJudiciales.id,
              success:true
            }
          }catch(error){
            this.logger.error(`Error durante la actualizacion de datos judiciales:${error}`);
            throw new HttpException(`Error durante laactualizacion de datos judicialess:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
          } 
        }
  

}