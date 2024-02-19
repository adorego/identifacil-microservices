import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { CausaJudicialDTO } from "src/core/dto/causa/causa.dto";
import { Condena } from "src/core/entities/condena.entity";
import { HechoPunible } from "src/core/entities/hecho_punible.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RespuestaFactoryCausaJudicialDTO } from "src/core/dto/causa/respuesta-factory-causaJudicial.dto";

@Injectable()
export class DatosPenalesFactory{
  constructor(
    private dataService:IDataService
  ){}

  async creacionDeCausaJudicialGenerar(causaJudicialDTO:CausaJudicialDTO):Promise<RespuestaFactoryCausaJudicialDTO>{
   
   
    if(!causaJudicialDTO.despacho_judicial){
      throw new HttpException(`El juzgado enviado no es válido`,HttpStatus.BAD_REQUEST);
    }
    const despachoJudicial = await this.dataService.despachoJudicial.get(causaJudicialDTO.despacho_judicial);

    if(!despachoJudicial){
      throw new HttpException(`El juzgado enviado no es válido`,HttpStatus.BAD_REQUEST)
    }
    if(!causaJudicialDTO.hechos_punibles){
      throw new HttpException(`Se deben enviar los hechos punibles de esta causa judicial`,HttpStatus.BAD_REQUEST);
    }

    let hechos_punibles:Array<HechoPunible> = null;
    hechos_punibles = await Promise.all(causaJudicialDTO.hechos_punibles.map(
      async (hechoPunible) =>{
        const hecho_punible_encontrado = await this.dataService.hechoPunible.get(hechoPunible);
        if(!hecho_punible_encontrado){
          throw new HttpException(`No se encontró el hecho punible asociado a${hechoPunible}`,HttpStatus.BAD_REQUEST);
          
        }
        return hecho_punible_encontrado;

      }
    ))

    if(!causaJudicialDTO.circunscripcion){
      throw new HttpException(`Se debe enviar la circunscripcion`,HttpStatus.BAD_REQUEST); 
    }
    const circunscripcion = await this.dataService.circunscripcionJudicial.get(causaJudicialDTO.circunscripcion)
    if(!circunscripcion){
      throw new HttpException(`No se envió correctamente la circunscripcion`,HttpStatus.BAD_REQUEST);
    }

    if(!causaJudicialDTO.ppls || causaJudicialDTO.ppls.length === 0){
      throw new HttpException(`La lista de PPLs relacionados a la causa no puede estar vacia`,HttpStatus.BAD_REQUEST);
    }
    
    
    if(!causaJudicialDTO.ciudad){
      throw new HttpException(`Se debe enviar una ciudad valida para la causa`,HttpStatus.BAD_REQUEST);
    }

    const ciudad = await this.dataService.ciudad.get(causaJudicialDTO.ciudad);
    if(!ciudad){
      throw new HttpException(`No se encontró la ciudad en la base de datos`,HttpStatus.BAD_REQUEST);
    }

    if(!causaJudicialDTO.numeroDeDocumento){
      throw new HttpException(`El numero de documento de la causa no puede ser nulo`,HttpStatus.BAD_REQUEST);
    }
    
    if(!causaJudicialDTO.numeroDeExpediente){
      throw new HttpException(`El numero de expediente de la causa no puede ser nulo`,HttpStatus.BAD_REQUEST);
    }
    

    const causaJudicial = new CausaJudicial();
    causaJudicial.caratula_causa = causaJudicialDTO.caratula_causa;
    causaJudicial.estado_procesal = causaJudicialDTO.estado_procesal;
    causaJudicial.anho = causaJudicialDTO.anho;
    causaJudicial.circunscripcion = circunscripcion;
    causaJudicial.condenado = causaJudicialDTO.condenado;
    causaJudicial.despacho_judicial = despachoJudicial;
    causaJudicial.estado_procesal = causaJudicialDTO.estado_procesal;
    causaJudicial.hechos_punibles = hechos_punibles;
    causaJudicial.ciudad = ciudad;
    causaJudicial.numeroDeDocumento = causaJudicialDTO.numeroDeDocumento;
    causaJudicial.numeroDeExpediente = causaJudicialDTO.numeroDeExpediente;
    causaJudicial.ppls = causaJudicialDTO.ppls;
    causaJudicial.fecha_de_aprehension = causaJudicialDTO.fecha_de_aprehension;
    causaJudicial.fecha_de_compurgamiento_inicial = causaJudicialDTO.fecha_de_compurgamiento_inicial;
    causaJudicial.fecha_de_compurgamiento_recalculada = causaJudicialDTO.fecha_de_compurgamiento_recalculada;
    causaJudicial.juzgado_de_tribunal_de_sentencia = causaJudicialDTO.juzgado_de_tribunal_de_sentencia;
    causaJudicial.link_de_noticia = causaJudicialDTO.link_de_noticia;
    causaJudicial.lugar_del_hecho = causaJudicialDTO.lugar_del_hecho;
    causaJudicial.secretaria = causaJudicialDTO.secretaria;
    causaJudicial.sentencia_definitiva = causaJudicialDTO.sentencia_definitiva;
    causaJudicial.tiempo_de_condena = causaJudicialDTO.tiempo_de_condena;
    causaJudicial.tiempo_de_seguridad = causaJudicialDTO.tiempo_de_seguridad;
    causaJudicial.tiene_anhos_extra_de_seguridad = causaJudicialDTO.tiene_anhos_extra_de_seguridad;
    
    
    console.log("Causa Judicial a crear:", causaJudicial);
    
    return{
      causaJudicial:causaJudicial,
      
    }

  }
}