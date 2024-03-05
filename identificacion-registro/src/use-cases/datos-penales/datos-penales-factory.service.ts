import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { ExpedienteJudicialDTO } from "src/core/dto/datosPenales/expediente.dto";
import { HechoPunible } from "src/core/entities/hecho_punible.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RespuestaFactoryExpedienteJudicialDTO } from "src/core/dto/datosPenales/respuesta-factory-expedienteJudicial.dto";
import { DefensorDTO } from "src/core/dto/datosPenales/defensor.dto";
import { Defensor } from "src/core/entities/defensor";
import { HechoPunible_CausaJudicial } from "src/core/entities/hecho-punible-causa-judicial.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { DespachoJudicial } from "src/core/entities/despacho-judicial.entity";
import { CircunscripcionJudicial } from "src/core/entities/circunscripcion-judicial.entity";
import { Ciudad } from "src/core/entities/ciudad.entity";

@Injectable()
export class DatosPenalesFactory{
  private readonly logger = new Logger("DatosPenalesFactory");
  constructor(
    private dataService:IDataService
  ){}

  async creacionDeExpedienteJudicialGenerar(expedienteDTO:ExpedienteJudicialDTO):Promise<RespuestaFactoryExpedienteJudicialDTO>{
   
   
    
    try{

        //Verificacion de numero de expediente
        if(!expedienteDTO.numeroDeExpediente){
          throw new HttpException(`Debe enviarse el número de expediente`,HttpStatus.BAD_REQUEST)
        }

        if(!expedienteDTO.fechaDeExpediente){
          throw new HttpException(`Debe enviarse la fecha de creación del expediente`,HttpStatus.BAD_REQUEST)
        }

        const fechaExpediente = new Date(expedienteDTO.fechaDeExpediente);
        console.log("Fecha de expediente:", fechaExpediente);
        
        if(!expedienteDTO.condenado){
          throw new HttpException(`Debe enviarse la situación judicial`,HttpStatus.BAD_REQUEST)
        }

        if(!expedienteDTO.caratula_expediente){
          throw new HttpException(`Debe enviarse la caratula del expediente`,HttpStatus.BAD_REQUEST)
        }
        
        if(!expedienteDTO.hechosPuniblesCausas){
          throw new HttpException(`Debe enviarse el/los hechos punibles del expediente`,HttpStatus.BAD_REQUEST)
        }

        if(expedienteDTO.hechosPuniblesCausas.length == 0){
          throw new HttpException(`Debe enviarse el/los hechos punibles del expediente`,HttpStatus.BAD_REQUEST)
        }

        let fecha_de_aprehension:Date = null;
        if(expedienteDTO.fecha_de_aprehension){
          fecha_de_aprehension = new Date(expedienteDTO.fecha_de_aprehension)
        }

        let fechaCompurgamiento:Date = null;
        if(expedienteDTO.fecha_de_compurgamiento_inicial){
          fechaCompurgamiento = new Date(expedienteDTO.fecha_de_compurgamiento_inicial)
        }

        let fechaCompurgamientoRecalculada:Date = null;
        if(expedienteDTO.fecha_de_compurgamiento_recalculada){
          fechaCompurgamientoRecalculada = new Date(expedienteDTO.fecha_de_compurgamiento_recalculada)
        }
        let hechosPuniblesCausasACrear:Array<HechoPunible_CausaJudicial> = [];
        hechosPuniblesCausasACrear = await Promise.all(expedienteDTO.hechosPuniblesCausas.map(
          async (hechoPunibleCausa) =>{
            if(!hechoPunibleCausa[0] || !hechoPunibleCausa[1] || !(typeof(hechoPunibleCausa[0]) == "number") || !(typeof(hechoPunibleCausa[1]) == "number")){
              throw new HttpException(`Los hechos punibles deben enviarse en formato [HechoPunible][Causa-Judicial]`, HttpStatus.BAD_REQUEST);
            }
            try{
              const hechoPunible = await this.dataService.hechoPunible.get(hechoPunibleCausa[0]);
              if(!hechoPunible){
                throw new HttpException(`No se encuentra el hecho punible enviado`, HttpStatus.BAD_REQUEST);
              }
              // console.log("Hecho Punible:", hechoPunible);
              const causaJudicial = hechoPunible.causas.filter(
                (causa) => causa.id === hechoPunibleCausa[1]
              )
              if(!causaJudicial){
                throw new HttpException(`No se encuentra la causa judicial enviada`, HttpStatus.BAD_REQUEST);
              }
              // console.log("Causa Judicial:", causaJudicial);
              let hechoPunibleCausaJudicial = await this.dataService.hechoPunibleCausaJudicial.getHechoPunibleCausaByIds(hechoPunible.id, causaJudicial[0].id);
              // console.log("HechoPunibleCausaJudicial:", hechoPunibleCausaJudicial);
              if(!hechoPunibleCausaJudicial){
                hechoPunibleCausaJudicial = new HechoPunible_CausaJudicial();
                hechoPunibleCausaJudicial.hecho_punible = hechoPunible;
                hechoPunibleCausaJudicial.causa_judicial = causaJudicial[0];
              }
             

              return hechoPunibleCausaJudicial
            }catch(error){
              this.logger.error(`Ocurrió un error al obtener los hechos punibles:${error}`);
              throw new HttpException(`Error al obtener el hecho punible:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
          }
        ))

        // let ppls:Array<Ppl> = [];
        // if(expedienteDTO.ppls && expedienteDTO.ppls.length > 0){
        //   ppls = await Promise.all(
        //     expedienteDTO.ppls.map(
        //       async (ppl) =>{
        //         try{
        //           const pplAdicionalEncontrado = await this.dataService.ppl.get(ppl);
        //           if(!pplAdicionalEncontrado){
        //             throw new HttpException(`Error al obtener el ppl de la lista de ppls`,HttpStatus.INTERNAL_SERVER_ERROR);
        //           }
        //           return pplAdicionalEncontrado
        //         }catch(error){
        //           this.logger.error(`Ocurrió un error al obtener los ppls adicionales:${error}`);
        //           throw new HttpException(`Error al obtener los ppls adicionales:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        //         }
        //       }
        //     )
        //   )
        // }

        let despachoJudicial:DespachoJudicial = null;
        if(expedienteDTO.despacho_judicial){
          despachoJudicial = await this.dataService.despachoJudicial.get(expedienteDTO.despacho_judicial);
          if(!despachoJudicial){
            throw new HttpException(`No se encontró el despacho Judicial enviado`, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }

        let circunscripcion:CircunscripcionJudicial = null;
        if(expedienteDTO.circunscripcion){
          circunscripcion = await this.dataService.circunscripcionJudicial.get(expedienteDTO.circunscripcion);
          if(!circunscripcion){
            throw new HttpException(`No se encontró la circunscripción enviada`, HttpStatus.BAD_REQUEST);
          }
        }

        let ciudad:Ciudad = null;
        if(expedienteDTO.ciudad){
          ciudad = await this.dataService.ciudad.get(expedienteDTO.ciudad)
          if(!ciudad){
            throw new HttpException(`No se encontró la circunscripción enviada`, HttpStatus.BAD_REQUEST);
          }
        }

        let defensor = null;
        if(expedienteDTO.defensor){
          defensor = await this.dataService.defensor.get(expedienteDTO.defensor);
          if(!defensor){
            throw new HttpException(`No se encontró el defensor enviado:id${expedienteDTO.defensor}`, HttpStatus.BAD_REQUEST);
          }
        }

        const expedienteJudicial = new ExpedienteJudicial();
        expedienteJudicial.numeroDeExpediente = expedienteDTO.numeroDeExpediente;
        expedienteJudicial.fechaDeExpediente = fechaExpediente;
        expedienteJudicial.caratula_expediente = expedienteDTO.caratula_expediente;
        expedienteJudicial.condenado = expedienteDTO.condenado;
        expedienteJudicial.estado_procesal = expedienteDTO.estado_procesal;
        expedienteJudicial.caratula_expediente = expedienteDTO.caratula_expediente;
        expedienteJudicial.despacho_judicial = despachoJudicial;
        expedienteJudicial.numeroDeDocumento = expedienteDTO.numeroDeDocumento;
        expedienteJudicial.anho = expedienteDTO.anho;
        expedienteJudicial.fecha_de_aprehension = fecha_de_aprehension;
        expedienteJudicial.tiempo_de_condena = expedienteDTO.tiempo_de_condena;
        expedienteJudicial.tiene_anhos_extra_de_seguridad = expedienteDTO.tiene_anhos_extra_de_seguridad;
        expedienteJudicial.tiempo_de_seguridad = expedienteDTO.tiempo_de_seguridad;
        expedienteJudicial.sentencia_definitiva = expedienteDTO.sentencia_definitiva;
        expedienteJudicial.fecha_de_compurgamiento_inicial = fechaCompurgamiento;
        expedienteJudicial.fecha_de_compurgamiento_recalculada = fechaCompurgamientoRecalculada;
        expedienteJudicial.juzgado_de_tribunal_de_sentencia = expedienteDTO.juzgado_de_tribunal_de_sentencia;
        expedienteJudicial.secretaria = expedienteDTO.secretaria;
        expedienteJudicial.lugar_del_hecho = expedienteDTO.lugar_del_hecho;
        expedienteJudicial.link_de_noticia = expedienteDTO.link_de_noticia;
        expedienteJudicial.ppls = expedienteDTO.ppls;
        console.log("Fecha de expediente:", expedienteJudicial.fechaDeExpediente, expedienteJudicial.fecha_de_aprehension, expedienteJudicial.fecha_de_compurgamiento_inicial, expedienteJudicial.fecha_de_compurgamiento_recalculada);

      return{
            expedienteJudicial:expedienteJudicial,
            hechosPuniblesCausasJudiciales:hechosPuniblesCausasACrear,
            defensor:defensor,
            circunscripcion:circunscripcion,
            ciudad:ciudad,
            despachoJudicial:despachoJudicial,
           
      }
    }catch(error){
      this.logger.error(`Ocurrió un error en la generación de datos del Expediente:${error}`)
      throw new HttpException(`Ocurrió un error en la generación de datos del Expediente:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


  async actualizarExpedienteJudicialGenerar(id:number,expedienteDTO:ExpedienteJudicialDTO):Promise<RespuestaFactoryExpedienteJudicialDTO>{
    if(!id){
      throw new HttpException("El id enviado no es valido", HttpStatus.BAD_REQUEST);
    }
    const expedienteGuardado = await this.dataService.expediente.get(id);
    if(!expedienteGuardado){
      throw new HttpException("No se encuentra el Expediente", HttpStatus.BAD_REQUEST);
    }

    //Verificacion de numero de expediente
    if(!expedienteDTO.numeroDeExpediente){
      throw new HttpException(`Debe enviarse el número de expediente`,HttpStatus.BAD_REQUEST)
    }

    if(!expedienteDTO.fechaDeExpediente){
      throw new HttpException(`Debe enviarse la fecha de creación del expediente`,HttpStatus.BAD_REQUEST)
    }

    const fechaExpediente = new Date(expedienteDTO.fechaDeExpediente);
    console.log("Fecha de expediente:", fechaExpediente);
    
    if(!expedienteDTO.condenado){
      throw new HttpException(`Debe enviarse la situación judicial`,HttpStatus.BAD_REQUEST)
    }

    if(!expedienteDTO.caratula_expediente){
      throw new HttpException(`Debe enviarse la caratula del expediente`,HttpStatus.BAD_REQUEST)
    }
    
    if(!expedienteDTO.hechosPuniblesCausas){
      throw new HttpException(`Debe enviarse el/los hechos punibles del expediente`,HttpStatus.BAD_REQUEST)
    }

    if(expedienteDTO.hechosPuniblesCausas.length == 0){
      throw new HttpException(`Debe enviarse el/los hechos punibles del expediente`,HttpStatus.BAD_REQUEST)
    }

    let fecha_de_aprehension:Date = null;
    if(expedienteDTO.fecha_de_aprehension){
      fecha_de_aprehension = new Date(expedienteDTO.fecha_de_aprehension)
    }

    let fechaCompurgamiento:Date = null;
    if(expedienteDTO.fecha_de_compurgamiento_inicial){
      fechaCompurgamiento = new Date(expedienteDTO.fecha_de_compurgamiento_inicial)
    }

    let fechaCompurgamientoRecalculada:Date = null;
    if(expedienteDTO.fecha_de_compurgamiento_recalculada){
      fechaCompurgamientoRecalculada = new Date(expedienteDTO.fecha_de_compurgamiento_recalculada)
    }
    let hechosPuniblesCausasACrear:Array<HechoPunible_CausaJudicial> = [];
    hechosPuniblesCausasACrear = await Promise.all(expedienteDTO.hechosPuniblesCausas.map(
      async (hechoPunibleCausa) =>{
        if(!hechoPunibleCausa[0] || !hechoPunibleCausa[1] || !(typeof(hechoPunibleCausa[0]) == "number") || !(typeof(hechoPunibleCausa[1]) == "number")){
          throw new HttpException(`Los hechos punibles deben enviarse en formato [HechoPunible][Causa-Judicial]`, HttpStatus.BAD_REQUEST);
        }
        try{
          const hechoPunible = await this.dataService.hechoPunible.get(hechoPunibleCausa[0]);
          if(!hechoPunible){
            throw new HttpException(`No se encuentra el hecho punible enviado`, HttpStatus.BAD_REQUEST);
          }
          // console.log("Hecho Punible:", hechoPunible);
          const causaJudicial = hechoPunible.causas.filter(
            (causa) => causa.id === hechoPunibleCausa[1]
          )
          if(!causaJudicial){
            throw new HttpException(`No se encuentra la causa judicial enviada`, HttpStatus.BAD_REQUEST);
          }
          // console.log("Causa Judicial:", causaJudicial);
          let hechoPunibleCausaJudicial = await this.dataService.hechoPunibleCausaJudicial.getHechoPunibleCausaByIds(hechoPunible.id, causaJudicial[0].id);
          // console.log("HechoPunibleCausaJudicial:", hechoPunibleCausaJudicial);
          if(!hechoPunibleCausaJudicial){
            hechoPunibleCausaJudicial = new HechoPunible_CausaJudicial();
            hechoPunibleCausaJudicial.hecho_punible = hechoPunible;
            hechoPunibleCausaJudicial.causa_judicial = causaJudicial[0];
          }
         

          return hechoPunibleCausaJudicial
        }catch(error){
          this.logger.error(`Ocurrió un error al obtener los hechos punibles:${error}`);
          throw new HttpException(`Error al obtener el hecho punible:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
      }
    ))

    let despachoJudicial:DespachoJudicial = null;
    if(expedienteDTO.despacho_judicial){
      despachoJudicial = await this.dataService.despachoJudicial.get(expedienteDTO.despacho_judicial);
      if(!despachoJudicial){
        throw new HttpException(`No se encontró el despacho Judicial enviado`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    let circunscripcion:CircunscripcionJudicial = null;
    if(expedienteDTO.circunscripcion){
      circunscripcion = await this.dataService.circunscripcionJudicial.get(expedienteDTO.circunscripcion);
      if(!circunscripcion){
        throw new HttpException(`No se encontró la circunscripción enviada`, HttpStatus.BAD_REQUEST);
      }
    }

    let ciudad:Ciudad = null;
    if(expedienteDTO.ciudad){
      ciudad = await this.dataService.ciudad.get(expedienteDTO.ciudad)
      if(!ciudad){
        throw new HttpException(`No se encontró la circunscripción enviada`, HttpStatus.BAD_REQUEST);
      }
    }

    let defensor = null;
    if(expedienteDTO.defensor){
      defensor = await this.dataService.defensor.get(expedienteDTO.defensor);
      if(!defensor){
        throw new HttpException(`No se encontró el defensor enviado:id${expedienteDTO.defensor}`, HttpStatus.BAD_REQUEST);
      }
    }
    expedienteGuardado.numeroDeExpediente = expedienteDTO.numeroDeExpediente;
    expedienteGuardado.fechaDeExpediente = fechaExpediente;
    expedienteGuardado.caratula_expediente = expedienteDTO.caratula_expediente;
    expedienteGuardado.condenado = expedienteDTO.condenado;
    expedienteGuardado.estado_procesal = expedienteDTO.estado_procesal;
    expedienteGuardado.caratula_expediente = expedienteDTO.caratula_expediente;
    expedienteGuardado.despacho_judicial = despachoJudicial;
    expedienteGuardado.numeroDeDocumento = expedienteDTO.numeroDeDocumento;
    expedienteGuardado.anho = expedienteDTO.anho;
    expedienteGuardado.fecha_de_aprehension = fecha_de_aprehension;
    expedienteGuardado.tiempo_de_condena = expedienteDTO.tiempo_de_condena;
    expedienteGuardado.tiene_anhos_extra_de_seguridad = expedienteDTO.tiene_anhos_extra_de_seguridad;
    expedienteGuardado.tiempo_de_seguridad = expedienteDTO.tiempo_de_seguridad;
    expedienteGuardado.sentencia_definitiva = expedienteDTO.sentencia_definitiva;
    expedienteGuardado.fecha_de_compurgamiento_inicial = fechaCompurgamiento;
    expedienteGuardado.fecha_de_compurgamiento_recalculada = fechaCompurgamientoRecalculada;
    expedienteGuardado.juzgado_de_tribunal_de_sentencia = expedienteDTO.juzgado_de_tribunal_de_sentencia;
    expedienteGuardado.secretaria = expedienteDTO.secretaria;
    expedienteGuardado.lugar_del_hecho = expedienteDTO.lugar_del_hecho;
    expedienteGuardado.link_de_noticia = expedienteDTO.link_de_noticia;
    expedienteGuardado.ppls = expedienteDTO.ppls;

    return{
      expedienteJudicial:expedienteGuardado,
      hechosPuniblesCausasJudiciales:hechosPuniblesCausasACrear,
      defensor:defensor,
      circunscripcion:circunscripcion,
      ciudad:ciudad,
      despachoJudicial:despachoJudicial,
     
    }
  }
}