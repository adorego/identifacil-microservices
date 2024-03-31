import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Patch, Post, Put } from "@nestjs/common";
import { ActualizarPplsEnExpedienteDTO } from "src/core/dto/datosPenales/actualizar-ppls-en-expediente.dto";
import { ExpedienteJudicialDTO } from "src/core/dto/datosPenales/expediente.dto";
import { HechoPunibleDTO } from "src/core/dto/datosPenales/hecho-punible.dto";
import { DatosPenalesUseCases } from "src/use-cases/datos-penales/datos-penales-use-case.service";


@Controller('datos_penales')
export class DatosPenalesController{
    private readonly logger:Logger = new Logger('DatosPenalesController');
    constructor(
        private datosPenalesUseCaseService:DatosPenalesUseCases
    ){}

    @Get('expedientes')
    async getAll(){
        try{
        this.logger.log("Llamada a getAll Expedientes");
        return this.datosPenalesUseCaseService.getExpedientes()
        }catch(error){
        this.logger.error(`Error al consultar los expedientes:${error}`);
        throw new HttpException(`Error al consultar los expedientes:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('expedientes/:id')
    async getExpedienteById(@Param() param:any){
        try{
        this.logger.log("Llamada a getExpedienteById");
        return this.datosPenalesUseCaseService.getExpedienteById(param.id)
        }catch(error){
        this.logger.error(`Error al consultar los expedientes:${error}`);
        throw new HttpException(`Error al consultar los expedientes:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('expedientes')
    async create_expediente(@Body() datos:ExpedienteJudicialDTO){
        this.logger.log('POST expedientes, datos recibidos:',datos);
        const respuestaDatosPenalesUseCase = await this.datosPenalesUseCaseService.crearExpedienteJudicial(datos);
        return{
            success:true,
            id:respuestaDatosPenalesUseCase.id
        }
    } 

    @Put('expedientes/:id')
    async update_expediente(@Param() param:any, @Body() datos:ExpedienteJudicialDTO){
        this.logger.log('PUT expedientes, datos recibidos:',datos);
        const respuestaDatosPenalesUseCase = await this.datosPenalesUseCaseService.actualizarExpedienteJudicial(param.id,datos);
        return{
            success:true,
            id:respuestaDatosPenalesUseCase.id
        }
    } 

    @Patch('expedientes/:id/ppls')
    async update_ppls_expediente(@Param() param:any, @Body() data:ActualizarPplsEnExpedienteDTO){

      this.logger.log('PATCH expediente, datos recibidos:',data);
      try{
        const respuestaDatosPenalesUseCase = await this.datosPenalesUseCaseService.actualizar_ppls_en_expediente(param.id,data.ppls);
        return respuestaDatosPenalesUseCase;
      }catch(error){
        this.logger.error(`Error al actualizar ppls en expediente:${error}`);
        throw new HttpException(`Error al actualizar ppls en expediente:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
    }

    @Get("expedientesByIdPersona/:id")
    async getExpedientesByIdPersona(@Param() param){
        try{
            this.datosPenalesUseCaseService.getExpedientesByIdPersona(param.id)
        }catch(error){
        this.logger.error("Error al consultar el expediente por el ID de la Persona:", error);
        throw new HttpException(`Error al consultar el expediente por el ID de la Persona:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

@Get("hechos_punibles")
  async hechos_punibles(){
    this.logger.log("Llamada a get hechos punible");
    try{
      const respuestaObtenerHechosPunibles = await this.datosPenalesUseCaseService.getHechosPunibles();
      return{
        hechosPunibles:respuestaObtenerHechosPunibles,
        success:true
      }

    }catch(error){
      this.logger.error("Ocurrio un error durante la consulta de hechos punibles:", error);
      throw new HttpException("Ocurrio un error durante la consulta de hechos punibles:", error);
    }
    
  }

  @Post("hechos_punibles")
  async create_hechos_punibles(@Body() hechoPunibleDTO:HechoPunibleDTO){
    this.logger.log(`Datos recibidos POST hechos_punibles:`, hechoPunibleDTO);
    try{
      const respuestaCrearHechoPunible = await this.datosPenalesUseCaseService.crearHechoPunible(hechoPunibleDTO);
      return{
        id:respuestaCrearHechoPunible.id,
        success:true
      }
    }catch(error){
      this.logger.error(`Ocurrio un error al crear el Hecho Punible:${error}`);
      throw new HttpException(`Ocurrio un error al crear el Hecho Punible:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  @Put("hechos_punibles/:id")
  async actualizar_hechos_punibles(@Param() param:any, @Body() hechoPunibleDTO:HechoPunibleDTO){
    this.logger.log(`Datos recibidos POST hechos_punibles:`, hechoPunibleDTO);
    try{
      const respuestaActualizarHechoPunible = await this.datosPenalesUseCaseService.actualizarHechoPunible(param.id, hechoPunibleDTO);
      return{
        id:respuestaActualizarHechoPunible.id,
        success:true
      }
    }catch(error){
      this.logger.error(`Ocurrio un error al crear el Hecho Punible:${error}`);
      throw new HttpException(`Ocurrio un error al crear el Hecho Punible:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  @Get("defensores")
  async defensores(){
    this.logger.log("Llamada a get hechos punible");
    try{
      const respuestaObtenerDefensores = await this.datosPenalesUseCaseService.getDefensores()
       return{
        defensores:respuestaObtenerDefensores,
        success:true
       } 
      

    }catch(error){
      this.logger.error("Ocurrio un error durante la consulta de Defensores:", error);
      throw new HttpException("Ocurrio un error durante la consulta de Defensores:", error);
    }
    
  }

  @Get("despachos_judiciales")
  async despachos_judiciales(){
    this.logger.log("Llamada a get Despachos Judiciales");
    try{
      const respuestaObtenerDespachosJudiciales = await this.datosPenalesUseCaseService.getDespachosJudiciales();
       return{
        despachosJudiciales:respuestaObtenerDespachosJudiciales,
        success:true
       } 
      

    }catch(error){
      this.logger.error("Ocurrio un error durante la consulta de Despachos Judiciales:", error);
      throw new HttpException("Ocurrio un error durante la consulta de Despachos Judiciales:", error);
    }
    
  }

  @Get("circunscripciones")
  async circunscripciones(){
    this.logger.log("Llamada a get Circunscripciones");
    try{
      const respuestaObtenerCircunscripciones = await this.datosPenalesUseCaseService.getCircunscripciones();
       return{
        circunscripciones:respuestaObtenerCircunscripciones,
        success:true
       } 
      

    }catch(error){
      this.logger.error("Ocurrio un error durante la consulta de Circunscripciones:", error);
      throw new HttpException("Ocurrio un error durante la consulta de Circunscripciones:", error);
    }
    
  }

  @Get("ciudades")
  async ciudades(){
    this.logger.log("Llamada a get Ciudades");
    try{
      const respuestaObtenerCiudades = await this.datosPenalesUseCaseService.getCiudades();
       return{
        ciudades:respuestaObtenerCiudades,
        success:true
       } 
      

    }catch(error){
      this.logger.error("Ocurrio un error durante la consulta de Ciudades:", error);
      throw new HttpException("Ocurrio un error durante la consulta de Ciudades:", error);
    }
    
  }
}



