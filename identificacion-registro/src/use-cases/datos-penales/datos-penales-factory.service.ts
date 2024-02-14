import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { CausaJudicialDTO } from "src/core/dto/causa/causa.dto";
import { Condena } from "src/core/entities/condena.entity";
import { HechoPunible } from "src/core/entities/hecho_punible.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";

@Injectable()
export class DatosPenalesFactory{
  constructor(
    private dataService:IDataService
  ){}

  async creacionDeCausaJudicialGenerar(causaJudicialDTO:CausaJudicialDTO){
    //Validar id_persona
    if(!causaJudicialDTO.id_persona){
      throw new HttpException(`El id de persona debe ser valido`,HttpStatus.BAD_REQUEST);
    }
    const personaEncontrada = await this.dataService.persona.get(causaJudicialDTO.id_persona);
    if(!personaEncontrada){
      throw new HttpException(`No se encontro a la persona en la Base de datos`, HttpStatus.BAD_REQUEST);
    }
    if(!causaJudicialDTO.despachoJudicial){
      throw new HttpException(`El juzgado enviado no es válido`,HttpStatus.BAD_REQUEST);
    }
    const despachoJudicial = await this.dataService.despachoJudicial.get(causaJudicialDTO.despachoJudicial);

    let condena:Condena = null;
    if(causaJudicialDTO.condenado){
      if(!causaJudicialDTO.condena){
        throw new HttpException(`No se envio la Condena`,HttpStatus.BAD_REQUEST);
      }
      if(causaJudicialDTO.condena.anhos){
        condena = new Condena();
        condena.anhos = causaJudicialDTO.condena.anhos;
      }
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

    if(causaJudicialDTO.ppls.length === 0){
      throw new HttpException(`La lista de PPLs relacionados a la causa no puede estar vacia`,HttpStatus.BAD_REQUEST);
    }
    const ppls = await Promise.all(
      causaJudicialDTO.ppls.map(
        async (ppl) =>{
          return await this.dataService.ppl.get(ppl);
        }
      )
    )
    
    if(!causaJudicialDTO.ciudad){
      throw new HttpException(`Se debe enviar una ciudad valida para la causa`,HttpStatus.BAD_REQUEST);
    }

    const ciudad = await this.dataService.ciudad.get(causaJudicialDTO.ciudad);
    if(!ciudad){
      throw new HttpException(`No se encontró la ciudad en la base de datos`,HttpStatus.BAD_REQUEST);
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
    causaJudicial.ppls = ppls;
    
    console.log("Causa Judicial a crear:", causaJudicial);
    
    return{
      causaJudicial:causaJudicial,
      condena:condena
    }

  }
}