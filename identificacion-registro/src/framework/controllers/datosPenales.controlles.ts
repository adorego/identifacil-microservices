import { Body, Controller, Get, HttpException, Logger, Post } from "@nestjs/common";

import { IDataService } from "src/core/abstract/data-service.abstract";
import { CausaJudicialDTO } from "src/core/dto/causa/causa.dto";
import { RespuestaCrearCausaJudicialDTO } from "src/core/dto/causa/respuesta-crear-causaJudicial.dto";
import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { DatosPenalesUseCases } from "src/use-cases/datos-penales/datos-penales-use-case.service";

@Controller('datos_penales')
export class DatosPenalesController{
  private readonly logger = new Logger('DatosPenalesController');
  constructor(
    private datosPenalesUseCases:DatosPenalesUseCases
  ){

  }
  
  @Get('causas')
  async getCausas():Promise<Array<CausaJudicial>>{
    return await this.datosPenalesUseCases.getCausas();
  }

  @Post('causas')
  async create(@Body() causaJudicialDTO:CausaJudicialDTO):Promise<RespuestaCrearCausaJudicialDTO>{
    this.logger.log(`Datos recibidos:`,causaJudicialDTO);
    const respuestaCausaJudicialUseCase = await this.datosPenalesUseCases.createCausaJudicial(causaJudicialDTO);
    return{
      success:true,
      id:respuestaCausaJudicialUseCase.id
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
      const respuestaObtenerCircunscripciones = await this.datosPenalesUseCases.getCiudades();
       return{
        circunscripciones:respuestaObtenerCircunscripciones,
        success:true
       } 
      

    }catch(error){
      this.logger.error("Ocurrio un error durante la consulta de Ciudades:", error);
      throw new HttpException("Ocurrio un error durante la consulta de Ciudades:", error);
    }
    
  }
}