import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Put } from "@nestjs/common";

import { IDataService } from "src/core/abstract/data-service.abstract";
import { RespuestaCrearExpedienteJudicialDTO } from "src/core/dto/datosPenales/respuesta-crear-expedienteJudicial.dto";
import { RespuestaActualizarCausaJudicialDTO } from "src/core/dto/registro_datos_judiciales/respuesta-actualizar-datosJudiciales.dto";
import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { DatosPenalesUseCases } from "src/use-cases/datos-penales/datos-penales-use-case.service";
import { ExpedienteJudicialDTO } from "../../core/dto/datosPenales/expediente.dto";
import { HechoPunibleDTO } from "src/core/dto/datosPenales/hecho-punible.dto";

@Controller('datos_penales')
export class DatosPenalesController{
  private readonly logger = new Logger('DatosPenalesController');
  constructor(
    private datosPenalesUseCases:DatosPenalesUseCases
  ){

  }
  
  
  @Post('expedientes')
  async create(@Body() expedienteDTO:ExpedienteJudicialDTO):Promise<RespuestaCrearExpedienteJudicialDTO>{
    try{
      this.logger.log(`Datos recibidos:`,expedienteDTO);
      const respuestaCrearExpedienteJudicial = await this.datosPenalesUseCases.crearExpedienteJudicial(expedienteDTO);
      return{
        success:true,
        id:respuestaCrearExpedienteJudicial?.id
      }
    }catch(error){
      this.logger.error("Error durante la creacion del expediente judicial:", error);
      throw new HttpException("Error durante el registro del expediente judicial:", HttpStatus.INTERNAL_SERVER_ERROR);

    }

  }

  @Put('expedientes/:id')
  async update(@Param() param:any, @Body() expedienteDTO:ExpedienteJudicialDTO):Promise<RespuestaCrearExpedienteJudicialDTO>{
    try{
      this.logger.log(`Datos recibidos:`,expedienteDTO);
      const respuestaActualizarExpedienteJudicial = await this.datosPenalesUseCases.actualizarExpedienteJudicial(param.id,expedienteDTO);
      return{
        success:true,
        id:respuestaActualizarExpedienteJudicial?.id
      }
    }catch(error){
      this.logger.error("Error durante la actualizacion del expediente judicial:", error);
      throw new HttpException("Error durante la actualizacion del expediente judicial:", HttpStatus.INTERNAL_SERVER_ERROR);

    }

  }

  @Get("hechos_punibles")
  async hechos_punibles(){
    this.logger.log("Llamada a get hechos punible");
    try{
      const respuestaObtenerHechosPunibles = await this.datosPenalesUseCases.getHechosPunibles();
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
      const respuestaCrearHechoPunible = await this.datosPenalesUseCases.crearHechoPunible(hechoPunibleDTO);
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
      const respuestaActualizarHechoPunible = await this.datosPenalesUseCases.actualizarHechoPunible(param.id, hechoPunibleDTO);
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
      const respuestaObtenerDefensores = await this.datosPenalesUseCases.getDefensores()
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
      const respuestaObtenerDespachosJudiciales = await this.datosPenalesUseCases.getDespachosJudiciales();
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
      const respuestaObtenerCircunscripciones = await this.datosPenalesUseCases.getCircunscripciones();
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
      const respuestaObtenerCiudades = await this.datosPenalesUseCases.getCiudades();
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