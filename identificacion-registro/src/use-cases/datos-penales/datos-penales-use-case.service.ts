import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { ExpedienteJudicialDTO } from "src/core/dto/datosPenales/expediente.dto";
import { DatosPenalesFactory } from "./datos-penales-factory.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RespuestaActualizarCausaUseCaseDTO } from "src/core/dto/datosPenales/respuesta-actualizar-causaJudicial.dto";
import { RespuestaCrearExpedienteJudicialDTO } from "src/core/dto/datosPenales/respuesta-crear-expedienteJudicial.dto";
import { HechoPunibleCausaJudicialModel } from "src/framework/data-service/postgres/models/hecho-punible-causa-judicial.model";
import { HechoPunible_CausaJudicial } from "src/core/entities/hecho-punible-causa-judicial.entity";
import { HechoPunibleDTO } from "src/core/dto/datosPenales/hecho-punible.dto";
import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { HechoPunible } from "src/core/entities/hecho_punible.entity";

@Injectable()
export class DatosPenalesUseCases{
  private readonly logger = new Logger("DatosPenalesUseCases");
  constructor(
    private dataService:IDataService,
    private datosPenalesFactory:DatosPenalesFactory
  ){

  }
  
  async crearExpedienteJudicial(expedienteDTO:ExpedienteJudicialDTO):Promise<RespuestaCrearExpedienteJudicialDTO>{
      try{
        const respuestaGeneracionExpedienteJudicialFactory = await this.datosPenalesFactory.creacionDeExpedienteJudicialGenerar(expedienteDTO);
        let hechosPuniblesCausasCreadas = null;
        // console.log("Datos recibidos:", respuestaGeneracionExpedienteJudicialFactory);
        if(respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales 
          && respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales.length > 0){
          // console.log("Entro aqui");
          hechosPuniblesCausasCreadas = await Promise.all(respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales.map(
            async (hechoPunibleCausa) =>{
              let hechoPuniblesCausaCreado:HechoPunible_CausaJudicial=null;
              if(!hechoPunibleCausa){
                console.log("Entro en null:", hechoPunibleCausa);
                hechoPuniblesCausaCreado = await this.dataService.hechoPunibleCausaJudicial.create(hechoPunibleCausa);
              }else{
                hechoPuniblesCausaCreado = hechoPunibleCausa
              }
              return hechoPuniblesCausaCreado;
              
            }
          ))
        }
        if(!hechosPuniblesCausasCreadas){
          throw new HttpException(`Los hechos punibles son invalidos`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        const expedienteACrear = respuestaGeneracionExpedienteJudicialFactory.expedienteJudicial;
        
        expedienteACrear.circunscripcion = respuestaGeneracionExpedienteJudicialFactory.circunscripcion;
        expedienteACrear.ciudad = respuestaGeneracionExpedienteJudicialFactory.ciudad;
        expedienteACrear.defensor = respuestaGeneracionExpedienteJudicialFactory.defensor;
        expedienteACrear.despacho_judicial = respuestaGeneracionExpedienteJudicialFactory.despachoJudicial;
        expedienteACrear.hechosPuniblesCausas = hechosPuniblesCausasCreadas;
        const expedienteJudicialCreado = await this.dataService.expediente.create(expedienteACrear);
        
        return {
          success:true,
          id:expedienteJudicialCreado.id
        }
      }catch(error){
          this.logger.error(`Error en la creación del expediente judicial`);
          throw new HttpException(`Error al crear el expediente judicial:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  async actualizarExpedienteJudicial(id:number, expedienteDTO:ExpedienteJudicialDTO){
    try{
      const respuestaGeneracionExpedienteJudicialFactory = await this.datosPenalesFactory.actualizarExpedienteJudicialGenerar(id, expedienteDTO);
      let hechosPuniblesCausasCreadas = null;
      // console.log("Datos recibidos:", respuestaGeneracionExpedienteJudicialFactory);
      if(respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales 
        && respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales.length > 0){
        // console.log("Entro aqui");
        hechosPuniblesCausasCreadas = await Promise.all(respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales.map(
          async (hechoPunibleCausa) =>{
            let hechoPuniblesCausaCreado:HechoPunible_CausaJudicial=null;
            if(!hechoPunibleCausa){
              console.log("Entro en null:", hechoPunibleCausa);
              hechoPuniblesCausaCreado = await this.dataService.hechoPunibleCausaJudicial.create(hechoPunibleCausa);
            }else{
              hechoPuniblesCausaCreado = hechoPunibleCausa
            }
            return hechoPuniblesCausaCreado;
            
          }
        ))
      }
      if(!hechosPuniblesCausasCreadas){
        throw new HttpException(`Los hechos punibles son invalidos`,HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const expedienteACrear = respuestaGeneracionExpedienteJudicialFactory.expedienteJudicial;
      
      expedienteACrear.circunscripcion = respuestaGeneracionExpedienteJudicialFactory.circunscripcion;
      expedienteACrear.ciudad = respuestaGeneracionExpedienteJudicialFactory.ciudad;
      expedienteACrear.defensor = respuestaGeneracionExpedienteJudicialFactory.defensor;
      expedienteACrear.despacho_judicial = respuestaGeneracionExpedienteJudicialFactory.despachoJudicial;
      expedienteACrear.hechosPuniblesCausas = hechosPuniblesCausasCreadas;
      const expedienteJudicialCreado = await this.dataService.expediente.update(expedienteACrear);
      
      return {
        success:true,
        id:expedienteJudicialCreado.id
      }
    }catch(error){
        this.logger.error(`Error en la creación del expediente judicial`);
        throw new HttpException(`Error al crear el expediente judicial:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getHechosPunibles(){
    return this.dataService.hechoPunible.getAll();
  }

  async crearHechoPunible(hechoPunibleDTO:HechoPunibleDTO):Promise<HechoPunible>{
    
    if(hechoPunibleDTO.causas.length == 0){
      throw new HttpException(`Debe haber por lo menos una causa asociada a este hecho punible`, HttpStatus.BAD_REQUEST)
    }
    let causasCreadas:Array<CausaJudicial> = null;
    if(hechoPunibleDTO.causas && hechoPunibleDTO.causas.length > 0){
      causasCreadas = await Promise.all(hechoPunibleDTO.causas.map(
        async (causa) =>{
            const causaAGuardar = new CausaJudicial();
            causaAGuardar.nombre = causa.nombre;
            causaAGuardar.codigo = causa.codigo;
            return await this.dataService.causaJudicial.create(causaAGuardar);
        }
      ))
    }
    const hechoPunible = new HechoPunible();
    hechoPunible.nombre = hechoPunibleDTO.nombre;
    hechoPunible.codigo = hechoPunibleDTO.codigo;
    hechoPunible.causas = causasCreadas;
    return await this.dataService.hechoPunible.create(hechoPunible);
  }

  async actualizarHechoPunible(id:number, hechoPunibleDTO:HechoPunibleDTO):Promise<HechoPunible>{
    if(!id){
      throw new HttpException(`Se debe enviar el id del Hecho Punible`, HttpStatus.BAD_REQUEST)
    }
    if(hechoPunibleDTO.causas.length == 0){
      throw new HttpException(`Debe haber por lo menos una causa asociada a este hecho punible`, HttpStatus.BAD_REQUEST)
    }
    let causasCreadas:Array<CausaJudicial> = null;
    if(hechoPunibleDTO.causas && hechoPunibleDTO.causas.length > 0){
      causasCreadas = await Promise.all(hechoPunibleDTO.causas.map(
        async (causa) =>{
            const causaAGuardar = new CausaJudicial();
            causaAGuardar.nombre = causa.nombre;
            causaAGuardar.codigo = causa.codigo;
            return await this.dataService.causaJudicial.create(causaAGuardar);
        }
      ))
    }
    const hechoPunible = await this.dataService.hechoPunible.get(id);
    if(!hechoPunible){
      throw new HttpException(`No se encontró el Hecho Punible`, HttpStatus.BAD_REQUEST)
    }
    await Promise.all(hechoPunible.causas.map(
      async (causa) =>{
        await this.dataService.causaJudicial.delete(causa);
      }
    ));
    hechoPunible.nombre = hechoPunibleDTO.nombre;
    hechoPunible.codigo = hechoPunibleDTO.codigo;
    hechoPunible.causas = causasCreadas;
    return await this.dataService.hechoPunible.update(hechoPunible);
  }
  async getDefensores(){
    return this.dataService.defensor.getAll();
  }

  async getDespachosJudiciales(){
    return this.dataService.despachoJudicial.getAll()
  }

  async getCircunscripciones(){
    return this.dataService.circunscripcionJudicial.getAll();
  }

  async getCiudades(){
    return this.dataService.ciudad.getAll();
  }
}