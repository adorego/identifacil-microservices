import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { ExpedienteJudicialDTO } from "src/core/dto/datosPenales/expediente.dto";
import { DatosPenalesFactory } from "./datos-penales-factory.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RespuestaCrearExpedienteJudicialDTO } from "src/core/dto/datosPenales/respuesta-crear-expedienteJudicial.dto";
import { HechoPunibleCausaJudicial } from "src/core/entities/hecho-punible-causa-judicial.entity";
import { HechoPunibleDTO } from "src/core/dto/datosPenales/hecho-punible.dto";
import { CausaJudicial } from "src/core/entities/causa-judicial.entity";
import { HechoPunible } from "src/core/entities/hecho_punible.entity";
import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { PplEnExpediente } from "src/core/entities/pplEnExpediente.entity";
import { RespuestGenericaActualizarCrearDTO } from "src/core/dto/respuesta-generica-actualizar-crear.dto";

@Injectable()
export class DatosPenalesUseCases{
  private readonly logger = new Logger("DatosPenalesUseCases");
  constructor(
    private dataService:IDataService,
    private datosPenalesFactory:DatosPenalesFactory
  ){

  }
  async getExpedientes():Promise<Array<ExpedienteJudicial>>{
    return await this.dataService.expediente.getAll();
  }

  async getExpedienteById(id:number):Promise<ExpedienteJudicial>{
    return await this.dataService.expediente.get(id);
  }
  async crearExpedienteJudicial(expedienteDTO:ExpedienteJudicialDTO):Promise<RespuestaCrearExpedienteJudicialDTO>{
      try{
        const respuestaGeneracionExpedienteJudicialFactory = await this.datosPenalesFactory.creacionDeExpedienteJudicialGenerar(expedienteDTO);
        let hechosPuniblesCausasCreadas = null;
        //console.log("Datos recibidos en use case:", respuestaGeneracionExpedienteJudicialFactory);
        if(respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales 
          && respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales.length > 0){
          
          hechosPuniblesCausasCreadas = await Promise.all(respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales.map(
            async (hechoPunibleCausa) =>{
              let hechoPuniblesCausaCreado:HechoPunibleCausaJudicial=null;
              //console.log("Hecho Punible es:", hechoPunibleCausa);
              if(!hechoPunibleCausa){
                //console.log("Entro en null:", hechoPunibleCausa);
                hechoPuniblesCausaCreado = await this.dataService.hechoPunibleCausaJudicial.create(hechoPunibleCausa);
              }else{
                hechoPuniblesCausaCreado = hechoPunibleCausa
              }
              return hechoPuniblesCausaCreado;
              
            }
          ))
          
        }
        //console.log("La lista de hechos punibles es:", hechosPuniblesCausasCreadas);
        if(!hechosPuniblesCausasCreadas){
          throw new HttpException(`Los hechos punibles son invalidos`,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        //Crear el objeto PPLEnExpediente
        //console.log("Antes de crear los ppls por expediente");
        let pplsEnExpedienteCreados:Array<PplEnExpediente> = [];
        if(respuestaGeneracionExpedienteJudicialFactory.pplsEnExpediente !== undefined && 
          respuestaGeneracionExpedienteJudicialFactory.pplsEnExpediente !== null && 
          respuestaGeneracionExpedienteJudicialFactory.pplsEnExpediente.length > 0){
          //console.log("Hay ppls en el expediente",respuestaGeneracionExpedienteJudicialFactory.pplsEnExpediente);
          const pplsEnExpedienteACrear = respuestaGeneracionExpedienteJudicialFactory.pplsEnExpediente;
          //console.log("pplEnExpediente:",pplsEnExpedienteACrear);
          pplsEnExpedienteCreados = await Promise.all(pplsEnExpedienteACrear.map(
            async (pplEnExpediente)=>{
              //console.log("Ppl para expediente:", pplEnExpediente);
              //Crear hechos puniblesCausas de este PPL
              let hechosPuniblesCausasPorPpl:Array<HechoPunibleCausaJudicial> = [];
              //console.log("PPLEnExpediente:", pplEnExpediente);
              if(pplEnExpediente.hechosPuniblesCausas && pplEnExpediente.hechosPuniblesCausas.length > 0){
                hechosPuniblesCausasPorPpl = await Promise.all(pplEnExpediente.hechosPuniblesCausas.map(
                  async (hechoPunibleCausa)=>{
                    
                    if(!hechoPunibleCausa?.id){
                      return await this.dataService.hechoPunibleCausaJudicial.create(hechoPunibleCausa);
                    }else{
                      return hechoPunibleCausa
                    }
                  }
                ))
              }
              //Asociar hechosPuniblesCausas creadas
              pplEnExpediente.hechosPuniblesCausas = hechosPuniblesCausasPorPpl;
              //Si tiene condena crear la condena en la BD
               if(pplEnExpediente.condenado){
                let tiempoDeCondena = await this.dataService.tiempoDeCondena.getTiempoDeCondenaByCombination(pplEnExpediente.condena.tiempo_de_condena.anhos, pplEnExpediente.condena.tiempo_de_condena.meses);
                
                if(!tiempoDeCondena){
                  tiempoDeCondena = await this.dataService.tiempoDeCondena.create(pplEnExpediente.condena.tiempo_de_condena);
                }
                let tiempoExtraCondena =null;
                if(pplEnExpediente.condena.tiene_anhos_extra_por_medida_de_seguridad){
                  tiempoExtraCondena = await this.dataService.tiempoDeCondena.getTiempoDeCondenaByCombination(pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad.anhos, pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad.meses);
                }
                if(!tiempoExtraCondena){
                  tiempoExtraCondena = await this.dataService.tiempoDeCondena.create(pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad);
                }
                //console.log("Tiempo de condena:",tiempoDeCondena,"Tiempo extra de condena:", tiempoExtraCondena);
                pplEnExpediente.condena.tiempo_de_condena = tiempoDeCondena;
                pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad = tiempoExtraCondena;
                pplEnExpediente.condena.tiene_anhos_extra_por_medida_de_seguridad = pplEnExpediente.condena.tiene_anhos_extra_por_medida_de_seguridad;
                console.log("Antes de crear la condena",pplEnExpediente.condena);
                const condenaCreada = await this.dataService.condena.create(pplEnExpediente.condena);
                console.log("Despues de crear la condena",condenaCreada);
                pplEnExpediente.condena = condenaCreada;
                
              }
              const pplEnExpedienteCreado = await this.dataService.pplEnExpediente.create(pplEnExpediente);
              console.log("Persona de PplEnExpediente guardado:", pplEnExpedienteCreado.ppl.persona);
              return pplEnExpedienteCreado;
            }
          ))
          //console.log("La lista de PPL en expediente es:", pplsEnExpedienteCreados);
        }
        //console.log("PplEnExpediente creados:", pplsEnExpedienteCreados);
        const expedienteACrear = respuestaGeneracionExpedienteJudicialFactory.expedienteJudicial;
        
        expedienteACrear.circunscripcion = respuestaGeneracionExpedienteJudicialFactory.circunscripcion;
        expedienteACrear.ciudad = respuestaGeneracionExpedienteJudicialFactory.ciudad;
        //console.log("Antes de asignar PplEnExpedienteCreado");
        expedienteACrear.ppls_en_expediente = pplsEnExpedienteCreados;
        //console.log("Después de asignar PplEnExpedienteCreado");
        expedienteACrear.despacho_judicial = respuestaGeneracionExpedienteJudicialFactory.despachoJudicial;
        expedienteACrear.hechosPuniblesCausas = hechosPuniblesCausasCreadas;
        //console.log("Antes de crear:", expedienteACrear);
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

  async actualizarExpedienteJudicial(id:number, expedienteDTO:ExpedienteJudicialDTO):Promise<RespuestGenericaActualizarCrearDTO>{
    try{
        const respuestaGeneracionExpedienteJudicialFactory = await this.datosPenalesFactory.actualizacionDeExpedienteJudicialGenerar(id,expedienteDTO);
        let hechosPuniblesCausasCreadas = null;
        //console.log("Datos recibidos:", respuestaGeneracionExpedienteJudicialFactory);
        if(respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales 
          && respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales.length > 0){
          
          hechosPuniblesCausasCreadas = await Promise.all(respuestaGeneracionExpedienteJudicialFactory.hechosPuniblesCausasJudiciales.map(
            async (hechoPunibleCausa) =>{
              let hechoPuniblesCausaCreado:HechoPunibleCausaJudicial=null;
              //console.log("Hecho Punible es:", hechoPunibleCausa);
              if(!hechoPunibleCausa){
                //console.log("Entro en null:", hechoPunibleCausa);
                hechoPuniblesCausaCreado = await this.dataService.hechoPunibleCausaJudicial.create(hechoPunibleCausa);
              }else{
                hechoPuniblesCausaCreado = hechoPunibleCausa
              }
              return hechoPuniblesCausaCreado;
              
            }
          ))
          
        }
        //console.log("La lista de hechos punibles es:", hechosPuniblesCausasCreadas);
        if(!hechosPuniblesCausasCreadas){
          throw new HttpException(`Los hechos punibles son invalidos`,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        //Crear el objeto PPLEnExpediente
        //console.log("Antes de crear los ppls por expediente");
        let pplsEnExpedienteCreados:Array<PplEnExpediente> = [];
        if(respuestaGeneracionExpedienteJudicialFactory.pplsEnExpediente && respuestaGeneracionExpedienteJudicialFactory.pplsEnExpediente.length > 0){
          //console.log("Hay ppls en el expediente");
          const pplsEnExpedienteACrear = respuestaGeneracionExpedienteJudicialFactory.pplsEnExpediente;
          pplsEnExpedienteCreados = await Promise.all(pplsEnExpedienteACrear.map(
            async (pplEnExpediente)=>{
              //console.log("Ppl para expediente:", pplEnExpediente);
              //Crear hechos puniblesCausas de este PPL
              let hechosPuniblesCausasPorPpl:Array<HechoPunibleCausaJudicial> = [];
              if(pplEnExpediente.hechosPuniblesCausas && pplEnExpediente.hechosPuniblesCausas.length > 0){
                hechosPuniblesCausasPorPpl = await Promise.all(pplEnExpediente.hechosPuniblesCausas.map(
                  async (hechoPunibleCausa)=>{
                    
                    if(!hechoPunibleCausa?.id){
                      return await this.dataService.hechoPunibleCausaJudicial.create(hechoPunibleCausa);
                    }else{
                      return hechoPunibleCausa
                    }
                  }
                ))
              }
              //Asociar hechosPuniblesCausas creadas
              pplEnExpediente.hechosPuniblesCausas = hechosPuniblesCausasPorPpl;
              //Si tiene condena crear la condena en la BD
              //console.log("Antes de entrar a pplEnExpediente");
              if(pplEnExpediente.condenado){
                let tiempoDeCondena = await this.dataService.tiempoDeCondena.getTiempoDeCondenaByCombination(pplEnExpediente.condena.tiempo_de_condena.anhos, pplEnExpediente.condena.tiempo_de_condena.meses);
                
                if(!tiempoDeCondena){
                  tiempoDeCondena = await this.dataService.tiempoDeCondena.create(pplEnExpediente.condena.tiempo_de_condena);
                }
                let tiempoExtraCondena =null;
                if(pplEnExpediente.condena.tiene_anhos_extra_por_medida_de_seguridad){
                  tiempoExtraCondena = await this.dataService.tiempoDeCondena.getTiempoDeCondenaByCombination(pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad.anhos, pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad.meses);
                }
                if(!tiempoExtraCondena){
                  tiempoExtraCondena = await this.dataService.tiempoDeCondena.create(pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad);
                }
                //console.log("Tiempo de condena:",tiempoDeCondena,"Tiempo extra de condena:", tiempoExtraCondena);
                pplEnExpediente.condena.tiempo_de_condena = tiempoDeCondena;
                pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad = tiempoExtraCondena;
                pplEnExpediente.condena.tiene_anhos_extra_por_medida_de_seguridad = pplEnExpediente.condena.tiene_anhos_extra_por_medida_de_seguridad;
                //console.log("Antes de crear la condena",pplEnExpediente.condena);
                const condenaCreada = await this.dataService.condena.create(pplEnExpediente.condena);
                //console.log("Despues de crear la condena");
                pplEnExpediente.condena = condenaCreada;
              }
              const pplEnExpedienteCreado = await this.dataService.pplEnExpediente.create(pplEnExpediente);
              //console.log("PplEnExpediente guardado:", pplEnExpedienteCreado);
              return pplEnExpedienteCreado;
            }
          ))
          //console.log("La lista de PPL en expediente es:", pplsEnExpedienteCreados);
        }
        //console.log("PplEnExpediente creados:", pplsEnExpedienteCreados);
        const expedienteACrear = respuestaGeneracionExpedienteJudicialFactory.expedienteJudicial;
        
        expedienteACrear.circunscripcion = respuestaGeneracionExpedienteJudicialFactory.circunscripcion;
        expedienteACrear.ciudad = respuestaGeneracionExpedienteJudicialFactory.ciudad;
        //console.log("Antes de asignar PplEnExpedienteCreado");
        expedienteACrear.ppls_en_expediente = pplsEnExpedienteCreados;
        //console.log("Después de asignar PplEnExpedienteCreado");
        expedienteACrear.despacho_judicial = respuestaGeneracionExpedienteJudicialFactory.despachoJudicial;
        expedienteACrear.hechosPuniblesCausas = hechosPuniblesCausasCreadas;
        console.log("Antes de crear:", expedienteACrear);
        const expedienteJudicialActualizado = await this.dataService.expediente.update(expedienteACrear);
      
      
      return {
        success:true,
        id:expedienteJudicialActualizado.id
      }
    }catch(error){
        this.logger.error(`Error en la creación del expediente judicial`);
        throw new HttpException(`Error al crear el expediente judicial:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getExpedientesByIdPersona(id:number):Promise<Array<ExpedienteJudicial>>{
    return this.dataService.expediente.getExpedientesByPersonaId(id);
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
    
    const hechoPunible = await this.dataService.hechoPunible.get(id);
    if(!hechoPunible){
      throw new HttpException(`No se encontró el Hecho Punible`, HttpStatus.BAD_REQUEST)
    }
    await Promise.all(hechoPunible.causas.map(
      async (causa) =>{
        console.log("Se va a eliminar la causa:", causa);
        const respuesta = await this.dataService.causaJudicial.delete(causa);
        if(!respuesta){
          throw new HttpException(`No se pudo eliminar la causa:${causa.id}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    ));
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