import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { RegistroPersonaDTO } from "src/core/dto/registro/registro-persona.dto";
import { RegistroSaludDTO } from "src/core/dto/registro_salud/registro-salud.dto";
import { RespuestaEstadoCivilDTO } from "src/core/dto/respuesta-estado-civil.dto";
import { RespuestaGrupoSanguineoDTO } from "src/core/dto/respuesta-grupo-sanguineo.dto";
import { RespuestaNacionalidadDTO } from "src/core/dto/respuesta-nacionalida.dto";
import { RespuestaRegistroPPLDTO } from "src/core/dto/registro/respuesta-registro-ppl.dto";
import { RespuestaRegistroSaludDTO} from "src/core/dto/registro/respuesta-registro-salud.dto";
import { RespuestaVacunasDTO } from "src/core/dto/respuesta-vacunas.dto";
import { RegistroFactory } from "src/use-cases/registro-factory.services";
import { RegistroUseCase } from "src/use-cases/registro-use-case.service";
import { log } from "console";
import { RespuestaActualizacionSaludDTO } from "src/core/dto/registro_salud/respuesta-actualizacioin-salud.dto";
import { RespuestaRegistroFotosDTO } from "src/core/dto/registro/respuesta-registro-fotos.dto";
import { RegistroDeFotosDTO } from "src/core/dto/registro/registro-de-fotos.dto";

interface CausasJudicialesParameter{
  ci:string;
}



@Controller()
export class RegistroController{
  private readonly logger = new Logger('RegistroController');
  constructor(
    private registroPersonaFactory:RegistroFactory,
    private registroPersonaUseCase:RegistroUseCase,
    
  ){}
 


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
    
    this.logger.log("Datos recibidos:", registro);
   
      //Transformacion de Datos
    const {persona:personaARegistrar,ppl} = await this.registroPersonaFactory.crearRegistro(registro,fotos);
    
    // console.log('PersonaARegistrada:', personaARegistrar);
    
    const savedPersona = await this.registroPersonaUseCase.registrar(personaARegistrar, ppl);
    //console.log("SavedPersona:", savedPersona);
    
    // return {sucess:true, savedPersona:savedPersona};
    return {sucess:true, id_persona:savedPersona.id, foto1:savedPersona.registro.foto1}
  }

  @Post('registro_fotos')
  @UseInterceptors(
    FileFieldsInterceptor([
      {name:'foto1', maxCount:1},
      {name:'foto2', maxCount:1},
      {name:'foto3', maxCount:1},
      {name:'foto4', maxCount:1},
      {name:'foto5', maxCount:1},

    ])
  )
  async registro_fotos(@UploadedFiles() fotos: {
    foto1: Array<Express.Multer.File>, 
    foto2: Array<Express.Multer.File>,
    foto3: Array<Express.Multer.File>,
    foto4: Array<Express.Multer.File>,
    foto5: Array<Express.Multer.File>},
    @Body() nombres_fotos:RegistroDeFotosDTO):Promise<RespuestaRegistroFotosDTO>{
      //console.log('Entro en registro_fotos',fotos,nombres_fotos);
      try{
        const respuestaRegistroDeFotos = await this.registroPersonaUseCase.registrar_fotos(fotos,nombres_fotos);
        //console.log("Respuesta de registrar_fotos use case:",respuestaRegistroDeFotos);
        const registro_fotos_creado = respuestaRegistroDeFotos.registro_fotos.map(
          (registro_foto) =>{
            return{
              nombre:registro_foto.nombre,
              foto:registro_foto.foto
            }
          }
        )
        return{
          success:respuestaRegistroDeFotos.success,
          registro_de_fotos:registro_fotos_creado,
          id:respuestaRegistroDeFotos.id
        }
      }catch(error){
        throw new HttpException(`Error al generar el registro de las fotos:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
      }
    
    
  }
  
  @Put('registro_fotos')
  @UseInterceptors(
    FileFieldsInterceptor([
      {name:'foto1', maxCount:1},
      {name:'foto2', maxCount:1},
      {name:'foto3', maxCount:1},
      {name:'foto4', maxCount:1},
      {name:'foto5', maxCount:1},

    ])
  )
  async update_fotos(@UploadedFiles() fotos: {
    foto1: Array<Express.Multer.File>, 
    foto2: Array<Express.Multer.File>,
    foto3: Array<Express.Multer.File>,
    foto4: Array<Express.Multer.File>,
    foto5: Array<Express.Multer.File>},
    @Body() nombres_fotos:RegistroDeFotosDTO):Promise<RespuestaRegistroFotosDTO>{
    
      try{
        const respuestaActualizacionDeFotos = await this.registroPersonaUseCase.actualizar_fotos(fotos,nombres_fotos);
        const registro_fotos_actualizado = respuestaActualizacionDeFotos.registro_fotos.map(
          (registro_foto) =>{
            return{
              nombre:registro_foto.nombre,
              foto:registro_foto.foto
            }
          }
        )
        return{
          success:respuestaActualizacionDeFotos.success,
          registro_de_fotos:registro_fotos_actualizado,
          id:respuestaActualizacionDeFotos.id
        }
      }catch(error){
        throw new HttpException(`Error al actualizar el registro de las fotos:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
      }
    
    }

  @Get('grupos_sanguineos')
  async grupos_sanguineos():Promise<RespuestaGrupoSanguineoDTO>{
    try{
      const grupos_sanguineos = await this.registroPersonaUseCase.grupos_sanguineos();
      const respuesta = new RespuestaGrupoSanguineoDTO();
      respuesta.grupos_sanguineos = grupos_sanguineos;
      respuesta.success = true;
      return respuesta;
    }catch(error){
      this.logger.error(`Error en la consulta de grupos_sanguineos de RegistroController:${error}`);
      throw new HttpException(`Error en la consulta de grupos_sanguineos de RegistroController:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    


  }
  @Get('vacunas')
  async vacunas():Promise<RespuestaVacunasDTO>{
    try{
      const vacunas = await this.registroPersonaUseCase.vacunas();
      const respuesta = new RespuestaVacunasDTO();
      respuesta.vacunas = vacunas;
      respuesta.success = true;
      return respuesta;
    }catch(error){
      this.logger.error(`Error en la consulta de vacunas de RegistroController:${error}`);
      throw new HttpException(`Error en la consulta de vacunas de RegistroController:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    


  }

  @Get('nacionalidades')
  async nacionalidades():Promise<RespuestaNacionalidadDTO>{
    try{
      const nacionalidades = await this.registroPersonaUseCase.nacionalidades();
      console.log("Nacionalidades:",nacionalidades);
      const repuesta = new RespuestaNacionalidadDTO();
      repuesta.nacionalidades = nacionalidades;
      repuesta.success = true;
      return repuesta;
    }catch(error){
      this.logger.error(`Error en la consulta de nacionalidades de RegistroController:${error}`);
      throw new HttpException(`Error en la consulta de nacionalidades de RegistroController:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  @Get('estados_civiles')
  async estadosCiviles():Promise<RespuestaEstadoCivilDTO>{
    try{
      const estados_civiles = await this.registroPersonaUseCase.estados_civiles();
      console.log("Estados Civiles:",estados_civiles);
      const respuesta = new RespuestaEstadoCivilDTO();
      respuesta.estadosCiviles = estados_civiles;
      respuesta.success = true;
      return respuesta;
    }catch(error){
      this.logger.error(`Error en la consulta de estadosCiviles de RegistroController:${error}`);
      throw new HttpException(`Error en la consulta de estadosCiviles de RegistroController:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  
  

  
  @Get('oficios')
  async getOficios(){
    try{
      const oficios = await this.registroPersonaUseCase.oficios();
    
      return(
        {
          oficios:oficios,
          success:true
        }
      )
    }catch(error){
      this.logger.error(`Error en la consulta de getOficios de RegistroController:${error}`);
      throw new HttpException(`Error en la consulta de getOficios de RegistroController:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  @Get('establecimientos')
  async getEstablecimientos(){
    try{
      const establecimientos = await this.registroPersonaUseCase.establecimientos();

      return(
        {
          establecimientos:establecimientos,
          success:true
        }
      )
    }catch(error){
      this.logger.error(`Error en la consulta de getEstablecimientos de RegistroController:${error}`);
      throw new HttpException(`Error en la consulta de getEstablecimientos de RegistroController:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  @Get('vinculos_familiares')
  async getVinculosFamiliares(){
    try{
      const vinculos_familiares = await this.registroPersonaUseCase.vinculos_familiares();
      return(
        {
          vinculos_familiares:vinculos_familiares,
          success:true
        }
      )
    }catch(error){
      this.logger.error(`Error en la consulta de getVinculosFamiliares de RegistroController:${error}`);
      throw new HttpException(`Error en la consulta de getVinculosFamiliares de RegistroController:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
  }
}

