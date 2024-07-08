import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { FaltaDTO } from "src/core/dto/faltas_sanciones/falta.dto";
import { ResultadoCrearFaltaFactoryDTO } from "src/core/dto/faltas_sanciones/resultado-crear-falta-factory.dto";
import { SancionDTO } from "src/core/dto/faltas_sanciones/sancion.dto";
import { Falta } from "src/core/entities/falta.entity";
import { Ppl } from "src/core/entities/ppl.entity";
import { Sancion } from "src/core/entities/sancion.entity";
import { FileService } from "src/framework/lib/files.service";

@Injectable()
export class FaltasSancionesFactory{
    constructor(
        private dataService:IDataService,
        private fileService:FileService,
    ){}

    async generar_falta(faltaDTO:FaltaDTO, resolucion_falta:Express.Multer.File):Promise<ResultadoCrearFaltaFactoryDTO>{
        if(!faltaDTO.ppl){
            throw new HttpException("Se debe enviar un PPL valido",HttpStatus.BAD_REQUEST);
        }
        const pplEncontradoPorPersonaId:Ppl = await this.dataService.ppl.getPPLByIdPersona(faltaDTO.ppl);
        if(!pplEncontradoPorPersonaId){
            throw new HttpException("No se encontro el PPL enviado",HttpStatus.BAD_REQUEST);
        }
        const pplEncontrado = await this.dataService.ppl.get(pplEncontradoPorPersonaId.id);
        if(!faltaDTO.tipo_de_falta){
            throw new HttpException("Debe enviarse un tipo de falta valido",HttpStatus.BAD_REQUEST);
        }

        const tipo_de_falta = await this.dataService.tipo_de_falta.get(faltaDTO.tipo_de_falta);
        if(!tipo_de_falta){
            throw new HttpException("No se encuentra el tipo de falta enviado",HttpStatus.BAD_REQUEST);
        }
        if(!faltaDTO.grado_de_falta){
            throw new HttpException("Se debe enviar el grado de la falta",HttpStatus.BAD_REQUEST);
        }
        const grado_de_la_falta = await this.dataService.grado_de_falta.get(faltaDTO.grado_de_falta);
        if(!grado_de_la_falta){
            throw new HttpException("No se encontró el grado de falta enviado",HttpStatus.BAD_REQUEST);
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
        let tipo_de_victima = null;
        if(faltaDTO.tipo_victima){
            tipo_de_victima = await this.dataService.tipo_de_victima.get(faltaDTO.tipo_victima);
        }

        if(!resolucion_falta){
            throw new HttpException("Se debe adjuntar una resolución para poder registrar la falta",HttpStatus.BAD_REQUEST);
        }

        

        const fecha_resolucion = new Date(faltaDTO.fecha_de_la_resolucion);

        const nuevaFalta = new Falta();
        nuevaFalta.fecha_y_hora_de_la_falta = new Date(faltaDTO.fecha_y_hora_de_la_falta);
        nuevaFalta.descripcion_de_la_falta = faltaDTO.descripcion_de_la_falta;
        nuevaFalta.numero_de_resolucion = faltaDTO.numero_de_resolucion;
        nuevaFalta.fecha_de_la_resolucion = fecha_resolucion
        nuevaFalta.victima_de_la_falta = faltaDTO.victima_de_la_falta;
        
        nuevaFalta.archivo_de_resolucion = await this.fileService.almacenar_archivo(resolucion_falta,`${pplEncontrado.persona.ci}-${fecha_resolucion}-resolucion-falta`)
        
        return{
            grado_de_falta:grado_de_la_falta,
            nueva_falta:nuevaFalta,
            ppl:pplEncontrado,
            sanciones_aplicadas:sancionesAplicadas,
            tipo_de_falta:tipo_de_falta,
            tipo_de_victima:tipo_de_victima
        }

    }

    async crearUpdateFalta(id:number,faltaDTO:FaltaDTO,resolucion_falta:Express.Multer.File){
        if(!id){
            throw new HttpException("El id de la falta es invalido",HttpStatus.BAD_REQUEST);
        }

        const faltaEncontrada = await this.dataService.falta.get(id);
        if(!faltaEncontrada){
            throw new HttpException("no se encuentra la falta enviada",HttpStatus.BAD_REQUEST);
        }
        if(!faltaDTO.ppl){
            throw new HttpException("Se debe enviar un PPL valido",HttpStatus.BAD_REQUEST);
        }
        const pplEncontradoPorPersonaId:Ppl = await this.dataService.ppl.getPPLByIdPersona(faltaDTO.ppl);
        if(!pplEncontradoPorPersonaId){
            throw new HttpException("No se encontro el PPL enviado",HttpStatus.BAD_REQUEST);
        }
        const pplEncontrado = await this.dataService.ppl.get(pplEncontradoPorPersonaId.id);
        if(!faltaDTO.tipo_de_falta){
            throw new HttpException("Debe enviarse un tipo de falta valido",HttpStatus.BAD_REQUEST);
        }

        const tipo_de_falta = await this.dataService.tipo_de_falta.get(faltaDTO.tipo_de_falta);
        if(!tipo_de_falta){
            throw new HttpException("No se encuentra el tipo de falta enviado",HttpStatus.BAD_REQUEST);
        }
        if(!faltaDTO.grado_de_falta){
            throw new HttpException("Se debe enviar el grado de la falta",HttpStatus.BAD_REQUEST);
        }
        const grado_de_la_falta = await this.dataService.grado_de_falta.get(faltaDTO.grado_de_falta);
        if(!grado_de_la_falta){
            throw new HttpException("No se encontró el grado de falta enviado",HttpStatus.BAD_REQUEST);
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
        let tipo_de_victima = null;
        if(faltaDTO.tipo_victima){
            tipo_de_victima = await this.dataService.tipo_de_victima.get(faltaDTO.tipo_victima);
        }

        if(!resolucion_falta){
            throw new HttpException("Se debe adjuntar una resolución para poder registrar la falta",HttpStatus.BAD_REQUEST);
        }

        

        const fecha_resolucion = new Date(faltaDTO.fecha_de_la_resolucion);


        faltaEncontrada.fecha_y_hora_de_la_falta = new Date(faltaDTO.fecha_y_hora_de_la_falta);
        faltaEncontrada.descripcion_de_la_falta = faltaDTO.descripcion_de_la_falta;
        faltaEncontrada.numero_de_resolucion = faltaDTO.numero_de_resolucion;
        faltaEncontrada.fecha_de_la_resolucion = fecha_resolucion
        faltaEncontrada.victima_de_la_falta = faltaDTO.victima_de_la_falta;
        
        faltaEncontrada.archivo_de_resolucion = await this.fileService.almacenar_archivo(resolucion_falta,`${pplEncontrado.persona.ci}-${fecha_resolucion}-resolucion-falta`)
        
        return{
            grado_de_falta:grado_de_la_falta,
            faltaAActualizar:faltaEncontrada,
            ppl:pplEncontrado,
            sanciones_aplicadas:sancionesAplicadas,
            tipo_de_falta:tipo_de_falta,
            tipo_de_victima:tipo_de_victima
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

        
        if(!sancionDTO.fechaInicio){
            throw new HttpException("Se debe enviar una fecha de inicio de la sanción",HttpStatus.BAD_REQUEST);
        }
        if(!sancionDTO.fechaFin){
            throw new HttpException("Se debe enviar una fecha fin de la sanción",HttpStatus.BAD_REQUEST);
        }

        const nuevaSancion = new Sancion();
        nuevaSancion.fecha_inicio = new Date(sancionDTO.fechaInicio);
        nuevaSancion.fecha_fin = new Date(sancionDTO.fechaFin);
        

        return{
            tipo_de_sancion:tipo_de_sancion,
            falta:faltaEncontrada,
            sancion:nuevaSancion

        }


    }

    async crearUpdateSancion(id:number,sancionDTO:SancionDTO,resolucion_falta:Express.Multer.File){
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

        
        if(!sancionDTO.fechaInicio){
            throw new HttpException("Se debe enviar una fecha de inicio de la sanción",HttpStatus.BAD_REQUEST);
        }
        if(!sancionDTO.fechaFin){
            throw new HttpException("Se debe enviar una fecha fin de la sanción",HttpStatus.BAD_REQUEST);
        }

        
        sancionEncontrada.fecha_inicio = new Date(sancionDTO.fechaInicio);
        sancionEncontrada.fecha_fin = new Date(sancionDTO.fechaFin);
        

        return{
            tipo_de_sancion:tipo_de_sancion,
            falta:faltaEncontrada,
            sancion:sancionEncontrada

        }

        

    }

    

   
}