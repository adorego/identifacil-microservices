import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { ExpedienteJudicialDTO } from "src/core/dto/datosPenales/expediente.dto";
import { HechoPunible } from "src/core/entities/hecho_punible.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RespuestaFactoryExpedienteJudicialDTO } from "src/core/dto/datosPenales/respuesta-factory-expedienteJudicial.dto";
import { DefensorDTO } from "src/core/dto/datosPenales/defensor.dto";
import { Defensor } from "src/core/entities/defensor";
import { HechoPunibleCausaJudicial } from "src/core/entities/hecho-punible-causa-judicial.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { DespachoJudicial } from "src/core/entities/despacho-judicial.entity";
import { CircunscripcionJudicial } from "src/core/entities/circunscripcion-judicial.entity";
import { Ciudad } from "src/core/entities/ciudad.entity";
import { Condena } from "src/core/entities/condena.entity";
import { TiempoDeCondena } from "src/core/entities/tiempo_de_condena.entity";
import { PplEnExpediente } from "src/core/entities/pplEnExpediente.entity";

@Injectable()
export class DatosPenalesFactory{
  private readonly logger = new Logger("DatosPenalesFactory");
  constructor(
    private dataService:IDataService
  ){}

  async creacionDeExpedienteJudicialGenerar(expedienteDTO:ExpedienteJudicialDTO):Promise<RespuestaFactoryExpedienteJudicialDTO>{
   
   console.log("Ingresó a creacionExpedienteJudicialGenerar:", expedienteDTO);
    
    try{

        //Verificacion de numero de expediente
        if(!expedienteDTO.numeroDeExpediente){
          throw new HttpException(`Debe enviarse el número de expediente`,HttpStatus.BAD_REQUEST)
        }

       
        if(expedienteDTO.condenado == null){
          throw new HttpException(`Debe enviarse la situación judicial`,HttpStatus.BAD_REQUEST)
        }

        if(!expedienteDTO.caratula_expediente){
          throw new HttpException(`Debe enviarse la caratula del expediente`,HttpStatus.BAD_REQUEST)
        }
        
        if(!expedienteDTO.hechosPuniblesCausas || expedienteDTO.hechosPuniblesCausas.length == 0){
          throw new HttpException(`Debe enviarse el/los hechos punibles del expediente`,HttpStatus.BAD_REQUEST)
        }

        if(expedienteDTO.hechosPuniblesCausas.length == 0){
          throw new HttpException(`Debe enviarse el/los hechos punibles del expediente`,HttpStatus.BAD_REQUEST)
        }

        let hechosPuniblesCausasDeExpediente:Array<HechoPunibleCausaJudicial> = [];
        hechosPuniblesCausasDeExpediente = await Promise.all(expedienteDTO.hechosPuniblesCausas.map(
          async (hechoPunibleCausa) =>{
            if(!hechoPunibleCausa[0] || !hechoPunibleCausa[1] || !(typeof(hechoPunibleCausa[0]) == "number") || !(typeof(hechoPunibleCausa[1]) == "number")){
              throw new HttpException(`Los hechos punibles deben enviarse en formato [HechoPunible][Causa-Judicial]`, HttpStatus.BAD_REQUEST);
            }
            try{
              const hechoPunible = await this.dataService.hechoPunible.get(hechoPunibleCausa[0]);
              if(!hechoPunible){
                throw new HttpException(`No se encuentra el hecho punible enviado`, HttpStatus.BAD_REQUEST);
              }
              //console.log("Hecho Punible:", hechoPunible);
              const causaJudicial = hechoPunible.causas.filter(
                (causa) => causa.id === hechoPunibleCausa[1]
              )
              if(!causaJudicial){
                throw new HttpException(`No se encuentra la causa judicial enviada`, HttpStatus.BAD_REQUEST);
              }
              //console.log("Causa Judicial:", causaJudicial);
              let hechoPunibleCausaJudicial:HechoPunibleCausaJudicial = await this.dataService.hechoPunibleCausaJudicial.getHechoPunibleCausaByIds(hechoPunible.id, causaJudicial[0].id);
             
              if(!hechoPunibleCausaJudicial){
                hechoPunibleCausaJudicial = new HechoPunibleCausaJudicial();
                hechoPunibleCausaJudicial.hecho_punible = hechoPunible;
                hechoPunibleCausaJudicial.causa_judicial = causaJudicial[0];
              }
             
              //console.log("HechoPunibleCausaJudicial:", hechoPunibleCausaJudicial);

              return hechoPunibleCausaJudicial
            }catch(error){
              this.logger.error(`Ocurrió un error al obtener los hechos punibles:${error}`);
              throw new HttpException(`Error al obtener el hecho punible:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
          }
        ))

        //console.log("Hechos punibles del expediente:", hechosPuniblesCausasDeExpediente);
        let pplsEnExpediente:Array<PplEnExpediente> = [];
        if(expedienteDTO.ppls && expedienteDTO.ppls.length > 0){
          pplsEnExpediente = await Promise.all(expedienteDTO.ppls.map(
            async (ppl) =>{
              const pplEncontrado = await   await this.dataService.ppl.getPPLByIdPersona(ppl.id_persona);
              //console.log("PPLEncontrado:",pplEncontrado);
              if(!pplEncontrado){
                throw new HttpException(`No se encontró el PPL enviado con id_persona:id:${ppl.id_persona}`,HttpStatus.BAD_REQUEST);
              }
              const pplEnExpediente:PplEnExpediente = new PplEnExpediente();
              pplEnExpediente.ppl = pplEncontrado;

              //Hechos punibles de PPL
              let hechosPuniblesCausasPPL:Array<HechoPunibleCausaJudicial> = [];
              if(ppl.hechosPuniblesCausas && ppl.hechosPuniblesCausas.length > 0){
                hechosPuniblesCausasPPL = await Promise.all(ppl.hechosPuniblesCausas.map(
                  async (hechoPunibleCausa)=>{
                    if(!hechoPunibleCausa[0] || !hechoPunibleCausa[1] || !(typeof(hechoPunibleCausa[0]) == "number") || !(typeof(hechoPunibleCausa[1]) == "number")){
                      throw new HttpException(`Los hechos punibles deben enviarse en formato [HechoPunible][Causa-Judicial]`, HttpStatus.BAD_REQUEST);
                    }
                    try{
                      const hechoPunible = await this.dataService.hechoPunible.get(hechoPunibleCausa[0]);
                      if(!hechoPunible){
                        throw new HttpException(`No se encuentra el hecho punible enviado`, HttpStatus.BAD_REQUEST);
                      }
                      //console.log("Hecho Punible:", hechoPunible);
                      const causaJudicial = hechoPunible.causas.filter(
                        (causa) => causa.id === hechoPunibleCausa[1]
                      )
                      if(!causaJudicial){
                        throw new HttpException(`No se encuentra la causa judicial enviada`, HttpStatus.BAD_REQUEST);
                      }
                      //console.log("Causa Judicial:", causaJudicial);
                      let hechoPunibleCausaJudicial:HechoPunibleCausaJudicial = await this.dataService.hechoPunibleCausaJudicial.getHechoPunibleCausaByIds(hechoPunible.id, causaJudicial[0].id);
                      if(!hechoPunibleCausaJudicial){
                        hechoPunibleCausaJudicial = new HechoPunibleCausaJudicial();
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
                //console.log("Hechos puniblesCausas:", hechosPuniblesCausasPPL);
                
              }
              pplEnExpediente.hechosPuniblesCausas = hechosPuniblesCausasPPL;
              
              if(expedienteDTO.condenado && ppl.condenado){
                console.log("Entro en sección condenado");
                pplEnExpediente.condena = new Condena();
                
                
                const tiempo_de_condena = new TiempoDeCondena();
                tiempo_de_condena.anhos = ppl.condena.anhos;
                tiempo_de_condena.meses = ppl.condena.meses;
                pplEnExpediente.condena.tiempo_de_condena = tiempo_de_condena;
                if(ppl.tiene_anhos_extra_por_medida_de_seguridad){
                  const condena_extra_por_medida_de_seguridad = new TiempoDeCondena();
                  condena_extra_por_medida_de_seguridad.anhos = ppl.anhos_extra_por_medida_de_seguridad.anhos;
                  condena_extra_por_medida_de_seguridad.meses = ppl.anhos_extra_por_medida_de_seguridad.meses;
                  pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad = condena_extra_por_medida_de_seguridad;
                  pplEnExpediente.condena.tiene_anhos_extra_por_medida_de_seguridad = true;
                }
                if(ppl.defensor){
                  const defensor = await this.dataService.defensor.get(ppl.defensor);
                  if(!defensor){
                    throw new HttpException(`No se ha encontrado al defensor con id:${defensor.id}`,HttpStatus.BAD_REQUEST);
                  }
                  pplEnExpediente.defensor = defensor;
                }
                //console.log("pplEnExpediente:", pplEnExpediente);
                
                
              }
              return pplEnExpediente;
            }
           
          ))
          
        }
        
        console.log("PplsEnExpediente:", pplsEnExpediente);
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

       

        const expedienteJudicial = new ExpedienteJudicial();
        expedienteJudicial.numeroDeExpediente = expedienteDTO.numeroDeExpediente;
        expedienteJudicial.caratula_expediente = expedienteDTO.caratula_expediente;
        expedienteJudicial.condenado = expedienteDTO.condenado;
        expedienteJudicial.estado_procesal = expedienteDTO.estado_procesal;
        expedienteJudicial.caratula_expediente = expedienteDTO.caratula_expediente;
        expedienteJudicial.despacho_judicial = despachoJudicial;
        expedienteJudicial.numeroDeDocumento = expedienteDTO.numeroDeDocumento;
        expedienteJudicial.anho = expedienteDTO.anho;
        expedienteJudicial.juzgado_de_tribunal_de_sentencia = expedienteDTO.juzgado_de_tribunal_de_sentencia;
        expedienteJudicial.secretaria = expedienteDTO.secretaria;
        expedienteJudicial.lugar_del_hecho = expedienteDTO.lugar_del_hecho;
        expedienteJudicial.link_de_noticia = expedienteDTO.link_de_noticia;
       
       
      return{
            expedienteJudicial:expedienteJudicial,
            hechosPuniblesCausasJudiciales:hechosPuniblesCausasDeExpediente,
            pplsEnExpediente:pplsEnExpediente,
            circunscripcion:circunscripcion,
            ciudad:ciudad,
            despachoJudicial:despachoJudicial,
           
      }
    }catch(error){
      this.logger.error(`Ocurrió un error en la generación de datos del Expediente:${error}`)
      throw new HttpException(`Ocurrió un error en la generación de datos del Expediente:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async actualizacionDeExpedienteJudicialGenerar(id:number,expedienteDTO:ExpedienteJudicialDTO):Promise<RespuestaFactoryExpedienteJudicialDTO>{
    try{

      if(!id){
        throw new HttpException(`Debe enviarse un id de expediente válido`,HttpStatus.BAD_REQUEST)
      }
      const expedienteAActualizar = await this.dataService.expediente.get(id);
      //Borrar PPLsEnExpediente
      if(expedienteAActualizar.pplsEnExpediente && expedienteAActualizar.pplsEnExpediente.length > 0){
        expedienteAActualizar.pplsEnExpediente.map(
          async (pplEnExpediente) =>{
            const condena_a_eliminar = pplEnExpediente.condena;
            const resultado_pplEnExpediente = await this.dataService.pplEnExpediente.delete(pplEnExpediente);
            const resultado_eliminar_condena = await this.dataService.condena.delete(condena_a_eliminar);
            
            if(!resultado_eliminar_condena || !resultado_pplEnExpediente){
              throw new HttpException(`No se pude eliminar el registro de PPLEnExpediente`,HttpStatus.INTERNAL_SERVER_ERROR);
            } 
          }
        )
      }

      if(!expedienteAActualizar){
        throw new HttpException(`No se encuentra el Expediente con el ID enviado`,HttpStatus.BAD_REQUEST)
      }
      //Verificacion de numero de expediente
      if(!expedienteDTO.numeroDeExpediente){
        throw new HttpException(`Debe enviarse el número de expediente`,HttpStatus.BAD_REQUEST)
      }

     
      if(expedienteDTO.condenado == null){
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

      let hechosPuniblesCausasDeExpediente:Array<HechoPunibleCausaJudicial> = [];
      hechosPuniblesCausasDeExpediente = await Promise.all(expedienteDTO.hechosPuniblesCausas.map(
        async (hechoPunibleCausa) =>{
          if(!hechoPunibleCausa[0] || !hechoPunibleCausa[1] || !(typeof(hechoPunibleCausa[0]) == "number") || !(typeof(hechoPunibleCausa[1]) == "number")){
            throw new HttpException(`Los hechos punibles deben enviarse en formato [HechoPunible][Causa-Judicial]`, HttpStatus.BAD_REQUEST);
          }
          try{
            const hechoPunible = await this.dataService.hechoPunible.get(hechoPunibleCausa[0]);
            if(!hechoPunible){
              throw new HttpException(`No se encuentra el hecho punible enviado`, HttpStatus.BAD_REQUEST);
            }
            //console.log("Hecho Punible:", hechoPunible);
            const causaJudicial = hechoPunible.causas.filter(
              (causa) => causa.id === hechoPunibleCausa[1]
            )
            if(!causaJudicial){
              throw new HttpException(`No se encuentra la causa judicial enviada`, HttpStatus.BAD_REQUEST);
            }
            //console.log("Causa Judicial:", causaJudicial);
            let hechoPunibleCausaJudicial:HechoPunibleCausaJudicial = await this.dataService.hechoPunibleCausaJudicial.getHechoPunibleCausaByIds(hechoPunible.id, causaJudicial[0].id);
           
            if(!hechoPunibleCausaJudicial){
              hechoPunibleCausaJudicial = new HechoPunibleCausaJudicial();
              hechoPunibleCausaJudicial.hecho_punible = hechoPunible;
              hechoPunibleCausaJudicial.causa_judicial = causaJudicial[0];
            }
           
            //console.log("HechoPunibleCausaJudicial:", hechoPunibleCausaJudicial);

            return hechoPunibleCausaJudicial
          }catch(error){
            this.logger.error(`Ocurrió un error al obtener los hechos punibles:${error}`);
            throw new HttpException(`Error al obtener el hecho punible:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
          }
          
        }
      ))

      console.log("Hechos punibles del expediente:", hechosPuniblesCausasDeExpediente);
      let pplsEnExpediente:Array<PplEnExpediente> = [];
      if(expedienteDTO.ppls && expedienteDTO.ppls.length > 0){
        pplsEnExpediente = await Promise.all(expedienteDTO.ppls.map(
          async (ppl) =>{
            const pplEncontrado = await this.dataService.ppl.getPPLByIdPersona(ppl.id_persona);
            if(!pplEncontrado){
              throw new HttpException(`No se encontró el PPL enviado con el id de persona:${ppl.id_persona}`,HttpStatus.BAD_REQUEST);
            }
            const pplEnExpediente:PplEnExpediente = new PplEnExpediente();
            pplEnExpediente.ppl = pplEncontrado;
            
            if(expedienteDTO.condenado && ppl.condenado){
              //Borrar condena actual
              pplEnExpediente.condena = new Condena();
              let hechosPuniblesCausasPPL:Array<HechoPunibleCausaJudicial> = [];
              if(ppl.hechosPuniblesCausas && ppl.hechosPuniblesCausas.length > 0){
                hechosPuniblesCausasPPL = await Promise.all(ppl.hechosPuniblesCausas.map(
                  async (hechoPunibleCausa)=>{
                    if(!hechoPunibleCausa[0] || !hechoPunibleCausa[1] || !(typeof(hechoPunibleCausa[0]) == "number") || !(typeof(hechoPunibleCausa[1]) == "number")){
                      throw new HttpException(`Los hechos punibles deben enviarse en formato [HechoPunible][Causa-Judicial]`, HttpStatus.BAD_REQUEST);
                    }
                    try{
                      const hechoPunible = await this.dataService.hechoPunible.get(hechoPunibleCausa[0]);
                      if(!hechoPunible){
                        throw new HttpException(`No se encuentra el hecho punible enviado`, HttpStatus.BAD_REQUEST);
                      }
                      //console.log("Hecho Punible:", hechoPunible);
                      const causaJudicial = hechoPunible.causas.filter(
                        (causa) => causa.id === hechoPunibleCausa[1]
                      )
                      if(!causaJudicial){
                        throw new HttpException(`No se encuentra la causa judicial enviada`, HttpStatus.BAD_REQUEST);
                      }
                      //console.log("Causa Judicial:", causaJudicial);
                      let hechoPunibleCausaJudicial:HechoPunibleCausaJudicial = await this.dataService.hechoPunibleCausaJudicial.getHechoPunibleCausaByIds(hechoPunible.id, causaJudicial[0].id);
                      if(!hechoPunibleCausaJudicial){
                        hechoPunibleCausaJudicial = new HechoPunibleCausaJudicial();
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
                //console.log("Hechos puniblesCausas:", hechosPuniblesCausasPPL);
                
              }
              pplEnExpediente.hechosPuniblesCausas = hechosPuniblesCausasPPL;
              const tiempo_de_condena = new TiempoDeCondena();
              tiempo_de_condena.anhos = ppl.condena.anhos;
              tiempo_de_condena.meses = ppl.condena.meses;
              pplEnExpediente.condena.tiempo_de_condena = tiempo_de_condena;
              if(ppl.tiene_anhos_extra_por_medida_de_seguridad){
                const condena_extra_por_medida_de_seguridad = new TiempoDeCondena();
                condena_extra_por_medida_de_seguridad.anhos = ppl.anhos_extra_por_medida_de_seguridad.anhos;
                condena_extra_por_medida_de_seguridad.meses = ppl.anhos_extra_por_medida_de_seguridad.meses;
                pplEnExpediente.condena.anhos_extra_por_medida_de_seguridad = condena_extra_por_medida_de_seguridad;
                pplEnExpediente.condena.tiene_anhos_extra_por_medida_de_seguridad = true;
              }
              if(ppl.defensor){
                const defensor = await this.dataService.defensor.get(ppl.defensor);
                if(!defensor){
                  throw new HttpException(`No se ha encontrado al defensor con id:${defensor.id}`,HttpStatus.BAD_REQUEST);
                }
                pplEnExpediente.defensor = defensor;
              }
              //console.log("pplEnExpediente:", pplEnExpediente);
              return pplEnExpediente;
              
            }
          }
         
        ))
        
      }
      
      //console.log("PplsEnExpediente:", pplsEnExpediente);
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

     

      const expedienteJudicial = expedienteAActualizar;
      expedienteJudicial.numeroDeExpediente = expedienteDTO.numeroDeExpediente;
      expedienteJudicial.caratula_expediente = expedienteDTO.caratula_expediente;
      expedienteJudicial.condenado = expedienteDTO.condenado;
      expedienteJudicial.estado_procesal = expedienteDTO.estado_procesal;
      expedienteJudicial.caratula_expediente = expedienteDTO.caratula_expediente;
      expedienteJudicial.despacho_judicial = despachoJudicial;
      expedienteJudicial.numeroDeDocumento = expedienteDTO.numeroDeDocumento;
      expedienteJudicial.anho = expedienteDTO.anho;
      expedienteJudicial.juzgado_de_tribunal_de_sentencia = expedienteDTO.juzgado_de_tribunal_de_sentencia;
      expedienteJudicial.secretaria = expedienteDTO.secretaria;
      expedienteJudicial.lugar_del_hecho = expedienteDTO.lugar_del_hecho;
      expedienteJudicial.link_de_noticia = expedienteDTO.link_de_noticia;
     
     
      return{
            expedienteJudicial:expedienteJudicial,
            hechosPuniblesCausasJudiciales:hechosPuniblesCausasDeExpediente,
            pplsEnExpediente:pplsEnExpediente,
            circunscripcion:circunscripcion,
            ciudad:ciudad,
            despachoJudicial:despachoJudicial,
          
      }
    }catch(error){
      this.logger.error(`Ocurrió un error en la generación de datos del Expediente:${error}`)
      throw new HttpException(`Ocurrió un error en la generación de datos del Expediente:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }


}