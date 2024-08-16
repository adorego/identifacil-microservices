import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { FaltaDTO, Victima } from "src/core/dto/faltas_sanciones/falta.dto";
import { ResultadoActualizarFaltaFactoryDTO } from "src/core/dto/faltas_sanciones/resultado-actualizar-falta-factory.dto";
import { ResultadoCrearFaltaFactoryDTO } from "src/core/dto/faltas_sanciones/resultado-crear-falta-factory.dto";
import { SancionDTO } from "src/core/dto/faltas_sanciones/sancion.dto";
import { Falta } from "src/core/entities/falta.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { Sancion } from "src/core/entities/sancion.entity";
import { TipoDeVictima } from "src/core/entities/tipo-victima.entity";
import { FileService } from "src/framework/lib/files.service";

@Injectable()
export class FaltasSancionesFactory{
    constructor(
        private dataService:IDataService,
        private fileService:FileService,
    ){}

    async generar_falta(faltaDTO:FaltaDTO, resolucion_falta:Express.Multer.File):Promise<ResultadoCrearFaltaFactoryDTO>{
        
        //Campos obligatorios:PPL, fecha_y_hora_de_la_falta,numero_de_resolucion, fecha_de_resolucion, grado_de_la_falta
        if(!faltaDTO.ppl){
            throw new HttpException("Se debe enviar un PPL valido",HttpStatus.BAD_REQUEST);
        }
        const pplEncontradoPorPersonaId:Ppl = await this.dataService.ppl.getPPLByIdPersona(faltaDTO.ppl);
        if(!pplEncontradoPorPersonaId){
            throw new HttpException("No se encontro el PPL enviado",HttpStatus.BAD_REQUEST);
        }
        const pplEncontrado = await this.dataService.ppl.get(pplEncontradoPorPersonaId.id);
        if(!pplEncontrado){
            throw new HttpException("No se encontro el PPL enviado",HttpStatus.BAD_REQUEST);
        }
        
        if(!faltaDTO.grado_de_falta){
            throw new HttpException("Se debe enviar el grado de la falta",HttpStatus.BAD_REQUEST);
        }
        const grado_de_la_falta = await this.dataService.grado_de_falta.get(faltaDTO.grado_de_falta);
        if(!grado_de_la_falta){
            throw new HttpException("No se encontró el grado de falta enviado",HttpStatus.BAD_REQUEST);
        }
        if(!faltaDTO.fecha_y_hora_de_la_falta){
            throw new HttpException("Se debe enviar la fecha y hora de la falta",HttpStatus.BAD_REQUEST);
        }
        let sancionesAplicadas = null;
        if(faltaDTO.sanciones_aplicadas && faltaDTO.sanciones_aplicadas.length >0){
            sancionesAplicadas = await Promise.all(faltaDTO.sanciones_aplicadas.map(
                async (sancionId)=>{
                    const sancionEncontrada = await this.dataService.sancion.get(sancionId);
                    if(!sancionEncontrada){
                        throw new HttpException(`No se encontro la sanción aplicada:${sancionId}`,HttpStatus.BAD_REQUEST);
                    }
                    return sancionEncontrada;
                }
            ))
        }

        let victimas_de_la_falta:Array<string>=null;
        if(faltaDTO.victimas_de_la_falta && faltaDTO.victimas_de_la_falta.length > 0){
            victimas_de_la_falta = faltaDTO.victimas_de_la_falta.map(
                (victima:Victima)=>{
                    
                    return JSON.stringify(victima)
                }
            )
        }

        let tipos_de_victimas:Array<TipoDeVictima> = null;
        if(faltaDTO.tipos_de_victimas && faltaDTO.tipos_de_victimas.length >0){
            tipos_de_victimas = await Promise.all(faltaDTO.tipos_de_victimas.map(
                async (tipo_de_victima_id)=>{

                    const tipo_de_victima_encontrada = await this.dataService.tipo_de_victima.get(tipo_de_victima_id);
                    if(!tipo_de_victima_encontrada){
                        throw new HttpException('No se encontró el tipo de victima enviado',HttpStatus.BAD_REQUEST)
                    }
                    return tipo_de_victima_encontrada;
                }
            ))
        }
       
        if(!faltaDTO.numero_de_resolucion){
            throw new HttpException("Se debe enviar el número de resolución",HttpStatus.BAD_REQUEST);
        }
        if(!faltaDTO.fecha_de_resolucion){
            throw new HttpException("Se debe enviar la fecha de la resolución",HttpStatus.BAD_REQUEST);
        }

        if(!faltaDTO.tipo_de_falta){
            throw new HttpException("Se debe enviar el tipo de falta",HttpStatus.BAD_REQUEST);
        }

        const tipoDeFalta = await this.dataService.tipo_de_falta.get(faltaDTO.tipo_de_falta);
        if(!tipoDeFalta){
            throw new HttpException("No se encuentra el tipo de falta enviado",HttpStatus.BAD_REQUEST);
        }
        

        const fecha_resolucion = new Date(faltaDTO.fecha_de_resolucion);

        const nuevaFalta = new Falta();
        nuevaFalta.fecha_y_hora_de_la_falta = faltaDTO.fecha_y_hora_de_la_falta;
        nuevaFalta.descripcion_de_la_falta = faltaDTO.descripcion_de_la_falta;
        nuevaFalta.numero_de_resolucion = faltaDTO.numero_de_resolucion;
        nuevaFalta.victimas_de_la_falta = victimas_de_la_falta;
        nuevaFalta.fecha_de_la_resolucion = fecha_resolucion
        nuevaFalta.archivo_de_resolucion = await this.fileService.almacenar_archivo(resolucion_falta,`resolucion_falta_${pplEncontrado.persona.numero_identificacion}-${fecha_resolucion.toLocaleDateString().replaceAll("/","-")}`);
        
        
        return{
            grado_de_falta:grado_de_la_falta,
            nueva_falta:nuevaFalta,
            ppl:pplEncontrado,
            sanciones_aplicadas:sancionesAplicadas,
            tipos_de_victimas:tipos_de_victimas,
            tipo_de_falta:tipoDeFalta
        }

    }

    async actualizar_falta(id:number,faltaDTO:FaltaDTO, resolucion_falta:Express.Multer.File):Promise<ResultadoActualizarFaltaFactoryDTO>{
        
        //Campos obligatorios:PPL, fecha_y_hora_de_la_falta,numero_de_resolucion, fecha_de_resolucion, grado_de_la_falta
        if(!id){
            throw new HttpException("Se debe enviar un PPL valido",HttpStatus.BAD_REQUEST);
        }
        const faltaEncontrada = await this.dataService.falta.get(id);
        if(!faltaEncontrada){
            throw new HttpException("No se encontró la falta enviada",HttpStatus.BAD_REQUEST);
        }
        if(!faltaDTO.ppl){
            throw new HttpException("Se debe enviar un PPL valido",HttpStatus.BAD_REQUEST);
        }
        const pplEncontradoPorPersonaId:Ppl = await this.dataService.ppl.getPPLByIdPersona(faltaDTO.ppl);
        if(!pplEncontradoPorPersonaId){
            throw new HttpException("No se encontro el PPL enviado",HttpStatus.BAD_REQUEST);
        }
        const pplEncontrado = await this.dataService.ppl.get(pplEncontradoPorPersonaId.id);
        if(!pplEncontrado){
            throw new HttpException("No se encontro el PPL enviado",HttpStatus.BAD_REQUEST);
        }
        
        if(!faltaDTO.grado_de_falta){
            throw new HttpException("Se debe enviar el grado de la falta",HttpStatus.BAD_REQUEST);
        }
        const grado_de_la_falta = await this.dataService.grado_de_falta.get(faltaDTO.grado_de_falta);
        if(!grado_de_la_falta){
            throw new HttpException("No se encontró el grado de falta enviado",HttpStatus.BAD_REQUEST);
        }
        if(!faltaDTO.fecha_y_hora_de_la_falta){
            throw new HttpException("Se debe enviar la fecha y hora de la falta",HttpStatus.BAD_REQUEST);
        }
        let sancionesAplicadas = null;
        if(faltaDTO.sanciones_aplicadas && faltaDTO.sanciones_aplicadas.length >0){
            sancionesAplicadas = await Promise.all(faltaDTO.sanciones_aplicadas.map(
                async (sancionId)=>{
                    const sancionEncontrada = await this.dataService.sancion.get(sancionId);
                    if(!sancionEncontrada){
                        throw new HttpException(`No se encontro la sanción aplicada:${sancionId}`,HttpStatus.BAD_REQUEST);
                    }
                    return sancionEncontrada;
                }
            ))
        }

        let victimas_de_la_falta:Array<string>=null;
        if(faltaDTO.victimas_de_la_falta && faltaDTO.victimas_de_la_falta.length > 0){
            victimas_de_la_falta = faltaDTO.victimas_de_la_falta.map(
                (victima:Victima)=>{
                    
                    return JSON.stringify(victima)
                }
            )
        }

        let tipos_de_victimas:Array<TipoDeVictima> = null;
        if(faltaDTO.tipos_de_victimas && faltaDTO.tipos_de_victimas.length >0){
            tipos_de_victimas = await Promise.all(faltaDTO.tipos_de_victimas.map(
                async (tipo_de_victima_id)=>{

                    const tipo_de_victima_encontrada = await this.dataService.tipo_de_victima.get(tipo_de_victima_id);
                    if(!tipo_de_victima_encontrada){
                        throw new HttpException('No se encontró el tipo de victima enviado',HttpStatus.BAD_REQUEST)
                    }
                    return tipo_de_victima_encontrada;
                }
            ))
        }
       
        if(!faltaDTO.numero_de_resolucion){
            throw new HttpException("Se debe enviar el número de resolución",HttpStatus.BAD_REQUEST);
        }
        if(!faltaDTO.fecha_de_resolucion){
            throw new HttpException("Se debe enviar la fecha de la resolución",HttpStatus.BAD_REQUEST);
        }

        if(!faltaDTO.tipo_de_falta){
            throw new HttpException("Se debe enviar el tipo de falta",HttpStatus.BAD_REQUEST);
        }

        const tipoDeFalta = await this.dataService.tipo_de_falta.get(faltaDTO.tipo_de_falta);
        if(!tipoDeFalta){
            throw new HttpException("No se encuentra el tipo de falta enviado",HttpStatus.BAD_REQUEST);
        }

        

        const fecha_resolucion = new Date(faltaDTO.fecha_de_resolucion);

        faltaEncontrada.fecha_y_hora_de_la_falta = faltaDTO.fecha_y_hora_de_la_falta;
        faltaEncontrada.descripcion_de_la_falta = faltaDTO.descripcion_de_la_falta;
        faltaEncontrada.numero_de_resolucion = faltaDTO.numero_de_resolucion;
        faltaEncontrada.victimas_de_la_falta = victimas_de_la_falta;
        faltaEncontrada.fecha_de_la_resolucion = fecha_resolucion
        faltaEncontrada.archivo_de_resolucion = await this.fileService.almacenar_archivo(resolucion_falta,`resolucion_falta_${pplEncontrado.persona.numero_identificacion}-${fecha_resolucion.toLocaleDateString().replaceAll("/","-")}`);
        
        
        return{
            grado_de_falta:grado_de_la_falta,
            falta_a_actualizar:faltaEncontrada,
            ppl:pplEncontrado,
            sanciones_aplicadas:sancionesAplicadas,
            tipos_de_victimas:tipos_de_victimas,
            tipo_de_falta:tipoDeFalta
        }

    }

    
    async generar_sancion(sancionDTO:SancionDTO, resolucion_sancion:Express.Multer.File){
        if(!sancionDTO.tipoDeSancion){
            throw new HttpException("Se debe enviar un tipo de sancion",HttpStatus.BAD_REQUEST);
        }
        const tipo_de_sancion = await this.dataService.tipo_sancion.get(sancionDTO.tipoDeSancion);
        if(!tipo_de_sancion){
            throw new HttpException("No se encuentra el tipo de sancio enviado",HttpStatus.BAD_REQUEST);
        }

        if(!sancionDTO.falta){
            throw new HttpException("Se debe enviar una falta valida",HttpStatus.BAD_REQUEST);
        }

        const faltaEncontrada = await this.dataService.falta.get(sancionDTO.falta);
        if(!faltaEncontrada){
            throw new HttpException("No se encuentra la falta enviada",HttpStatus.BAD_REQUEST);
        }
        console.log("fecha de la resolución encontrada:",faltaEncontrada.fecha_de_la_resolucion);

        
        if(!sancionDTO.fechaInicio){
            throw new HttpException("Se debe enviar una fecha de inicio de la sanción",HttpStatus.BAD_REQUEST);
        }
        if(!sancionDTO.fechaFin){
            throw new HttpException("Se debe enviar una fecha fin de la sanción",HttpStatus.BAD_REQUEST);
        }
        if(!resolucion_sancion){
            throw new HttpException("Se debe enviar el archivo de la resolución",HttpStatus.BAD_REQUEST);
        }

        const nuevaSancion = new Sancion();
        nuevaSancion.fecha_inicio = new Date(sancionDTO.fechaInicio);
        nuevaSancion.fecha_fin = new Date(sancionDTO.fechaFin);
        nuevaSancion.resolucion = await this.fileService.almacenar_archivo(resolucion_sancion,`resolucion-${faltaEncontrada.ppl.persona.numero_identificacion}-${new Date(faltaEncontrada.fecha_de_la_resolucion).toLocaleDateString().replaceAll("/","-")}`)
        

        return{
            tipo_de_sancion:tipo_de_sancion,
            falta:faltaEncontrada,
            sancion:nuevaSancion

        }


    }

    async update_sancion(id:number,sancionDTO:SancionDTO,resolucion_sancion:Express.Multer.File){
        if(!id){
            throw new HttpException("El id de la Sancion no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const sancionEncontrada = await this.dataService.sancion.get(id);
        if(!sancionEncontrada){
            throw new HttpException("No se encuentra la sanción enviada",HttpStatus.BAD_REQUEST);
        }
        if(!sancionDTO.tipoDeSancion){
            throw new HttpException("Se debe enviar un tipo de sancion",HttpStatus.BAD_REQUEST);
        }
        const tipo_de_sancion = await this.dataService.tipo_sancion.get(sancionDTO.tipoDeSancion);
        if(!tipo_de_sancion){
            throw new HttpException("No se encuentra el tipo de sancio enviado",HttpStatus.BAD_REQUEST);
        }

        if(!sancionDTO.falta){
            throw new HttpException("Se debe enviar una falta valida",HttpStatus.BAD_REQUEST);
        }

        const faltaEncontrada = await this.dataService.falta.get(sancionDTO.falta);
        if(!faltaEncontrada){
            throw new HttpException("No se encuentra la falta enviada",HttpStatus.BAD_REQUEST);
        }

        if(!resolucion_sancion){
            throw new HttpException("Se debe enviar el archivo de la resolución",HttpStatus.BAD_REQUEST);
        }
        
        if(!sancionDTO.fechaInicio){
            throw new HttpException("Se debe enviar una fecha de inicio de la sanción",HttpStatus.BAD_REQUEST);
        }
        if(!sancionDTO.fechaFin){
            throw new HttpException("Se debe enviar una fecha fin de la sanción",HttpStatus.BAD_REQUEST);
        }

        
        sancionEncontrada.fecha_inicio = new Date(sancionDTO.fechaInicio);
        sancionEncontrada.fecha_fin = new Date(sancionDTO.fechaFin);
        sancionEncontrada.resolucion = await this.fileService.almacenar_archivo(resolucion_sancion,`resolucion-${faltaEncontrada.ppl.persona.numero_identificacion}-${new Date(faltaEncontrada.fecha_de_la_resolucion).toLocaleDateString().replaceAll("/","-")}`)
      
        

        return{
            tipo_de_sancion:tipo_de_sancion,
            falta:faltaEncontrada,
            sancion:sancionEncontrada

        }

        

    }

    

   
}