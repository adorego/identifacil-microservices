import { Body, Controller, Get, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { RegistroPersonaDTO } from "src/core/dto/registro-persona.dto";
import { RespuestaRegistroPPLDTO } from "src/core/dto/respuesta-registro-ppl.dto";
import { RegistroFactory } from "src/use-cases/registro-factory.services";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";

@Controller('api/registro')
export class RegistroController{

  constructor(
    private registroPersonaFactory:RegistroFactory,
    private registroPersonaUseCase:RegistroUseCase
  ){}
  @Get('saludar')
  getHola(){
    return "Hola como estas"
  }


  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      {name:'foto1', maxCount:1},
      {name:'foto2', maxCount:1},
      {name:'foto3', maxCount:3}
    ])
  )
  async registrarppl(@UploadedFiles() fotos: {
    foto1: Array<Express.Multer.File>, 
    foto2: Array<Express.Multer.File>,
    foto3: Array<Express.Multer.File>},
    @Body() registro:RegistroPersonaDTO, ):Promise<RespuestaRegistroPPLDTO>{
    
   
      //Transformacion de Datos
    const personaARegistrar = await this.registroPersonaFactory.crearRegistro(registro,fotos);
    
    // console.log('PersonaARegistrada:', personaARegistrar);
    
    const savedPersona = await this.registroPersonaUseCase.registrar(personaARegistrar);
    //console.log("SavedPersona:", savedPersona);
    
    // return {sucess:true, savedPersona:savedPersona};
    return {sucess:true, savedPersona:savedPersona}
  }
}