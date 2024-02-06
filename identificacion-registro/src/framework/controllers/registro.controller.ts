import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { RegistroPersonaDTO } from "src/core/dto/registro/registro-persona.dto";
import { RegistroSaludDTO } from "src/core/dto/registro/registro-salud.dto";
import { RespuestaEstadoCivilDTO } from "src/core/dto/respuesta-estado-civil.dto";
import { RespuestaGrupoSanguineoDTO } from "src/core/dto/respuesta-grupo-sanguineo.dto";
import { RespuestaNacionalidadDTO } from "src/core/dto/respuesta-nacionalida.dto";
import { RespuestaRegistroPPLDTO } from "src/core/dto/registro/respuesta-registro-ppl.dto";
import { RespuestaRegistroSaludDTO} from "src/core/dto/registro/respuesta-registro-salud.dto";
import { RespuestaVacunasDTO } from "src/core/dto/respuesta-vacunas.dto";
import { RegistroFactory } from "src/use-cases/registro-factory.services";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";

interface CausasJudicialesParameter{
  ci:string;
}

@Controller()
export class RegistroController{

  constructor(
    private registroPersonaFactory:RegistroFactory,
    private registroPersonaUseCase:RegistroUseCase,
    
  ){}
  @Get('saludar')
  getHola(){
    return "Hola como estas"
  }


  @Post('registro_persona')
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
    const {persona:personaARegistrar,ppl} = await this.registroPersonaFactory.crearRegistro(registro,fotos);
    
    // console.log('PersonaARegistrada:', personaARegistrar);
    
    const savedPersona = await this.registroPersonaUseCase.registrar(personaARegistrar, ppl);
    //console.log("SavedPersona:", savedPersona);
    
    // return {sucess:true, savedPersona:savedPersona};
    return {sucess:true, savedPersona:savedPersona}
  }

  
  @Post('registrar_salud')
  async registrar_salud(@Body() registro_salud:RegistroSaludDTO):Promise<RespuestaRegistroSaludDTO>{
    const respuestaRegistroSalud =  await this.registroPersonaUseCase.registrar_salud(registro_salud);
    return {
      success:true
      }
  }

  @Get('grupos_sanguineos')
  async grupos_sanguineos():Promise<RespuestaGrupoSanguineoDTO>{
    const grupos_sanguineos = await this.registroPersonaUseCase.grupos_sanguineos();
    const respuesta = new RespuestaGrupoSanguineoDTO();
    respuesta.grupos_sanguineos = grupos_sanguineos;
    respuesta.success = true;
    return respuesta;


  }
  @Get('vacunas')
  async vacunas():Promise<RespuestaVacunasDTO>{
    const vacunas = await this.registroPersonaUseCase.vacunas();
    const respuesta = new RespuestaVacunasDTO();
    respuesta.vacunas = vacunas;
    respuesta.success = true;
    return respuesta;


  }

  @Get('nacionalidades')
  async nacionalidades():Promise<RespuestaNacionalidadDTO>{
    const nacionalidades = await this.registroPersonaUseCase.nacionalidades();
    const repuesta = new RespuestaNacionalidadDTO();
    repuesta.nacionalidades = nacionalidades;
    repuesta.success = true;
    return repuesta;
  }

  @Get('estados_civiles')
  async estadosCiviles():Promise<RespuestaEstadoCivilDTO>{
    const estados_civiles = await this.registroPersonaUseCase.estados_civiles();
    const respuesta = new RespuestaEstadoCivilDTO();
    respuesta.estadosCiviles = estados_civiles;
    respuesta.success = true;
    return respuesta;
  }

  
  @Get('causas')
  async causasJudiciales(@Query() parametros:CausasJudicialesParameter){
    
    const causas = await this.registroPersonaUseCase.causas_judiciales(parametros.ci);
    
    return(
      {
        causas:causas,
        success:true
      }
    )
  }
  @Get('oficios')
  async getOficios(){
    
    const oficios = await this.registroPersonaUseCase.oficios();
    
    return(
      {
        oficios:oficios,
        success:true
      }
    )
  }
}
