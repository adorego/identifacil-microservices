import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FaltasSancionesFactory } from "./faltas-y-sanciones-factory.service";
import { FaltaDTO } from "src/core/dto/faltas_sanciones/falta.dto";
import { ResultadoCrearFaltaFactoryDTO } from "src/core/dto/faltas_sanciones/resultado-crear-falta-factory.dto";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { SancionDTO } from "src/core/dto/faltas_sanciones/sancion.dto";


@Injectable()
export class FaltasSancionesUseCases{

    constructor(
        private dataService:IDataService,
        private faltasSancionesFactory:FaltasSancionesFactory
    ){}

    async crear_falta(faltaDTO:FaltaDTO,resolucion_falta:Express.Multer.File){
        const resultado:ResultadoCrearFaltaFactoryDTO = await this.faltasSancionesFactory.generar_falta(faltaDTO, resolucion_falta);
        resultado.nueva_falta.tipo_de_falta = resultado.tipo_de_falta;
        resultado.nueva_falta.grado_de_falta = resultado.grado_de_falta;
        resultado.nueva_falta.tipo_victima = resultado.tipo_de_victima;
        resultado.nueva_falta.ppl = resultado.ppl;
        resultado.nueva_falta.sanciones_aplicadas = resultado.sanciones_aplicadas;

        const faltaCreada = await this.dataService.falta.create(resultado.nueva_falta);
        return{
            id:faltaCreada.id,

        }
    }

    async update_falta(id:number,faltaDTO:FaltaDTO,resolucion_falta:Express.Multer.File){
        const resultado = await this.faltasSancionesFactory.crearUpdateFalta(id,faltaDTO,resolucion_falta);
        resultado.faltaAActualizar.tipo_de_falta = resultado.tipo_de_falta;
        resultado.faltaAActualizar.grado_de_falta = resultado.grado_de_falta;
        resultado.faltaAActualizar.tipo_victima = resultado.tipo_de_victima;
        resultado.faltaAActualizar.ppl = resultado.ppl;
        resultado.faltaAActualizar.sanciones_aplicadas = resultado.sanciones_aplicadas;

        const faltaActualizada = await this.dataService.falta.update(resultado.faltaAActualizar);
        return{
            id:faltaActualizada.id,

        }
    }

    async getFaltasPpl(id_persona:number){
        if(!id_persona){
            throw new HttpException('El id de la PPL no puede ser nulo',HttpStatus.BAD_REQUEST);
        }
        const pplEncontrado = await this.dataService.ppl.getPPLByIdPersona(id_persona);
        if(!pplEncontrado){
            throw new HttpException('No se encuentra el PPL enviado',HttpStatus.BAD_REQUEST);
        }
        const faltas = await this.dataService.falta.getAll();
        const faltasDelPpl = await Promise.all(faltas.map(
            async (falta)=>{
                return falta.ppl.id === pplEncontrado.id
            }
        ))
        return faltasDelPpl;
    }

    async getFaltaById(id_falta:number){
        return await this.dataService.falta.get(id_falta);
    }


    async crear_sancion(sancionDTO:SancionDTO, resolucion_sancion:Express.Multer.File){
        const resultado = await this.faltasSancionesFactory.generar_sancion(sancionDTO,resolucion_sancion);
        resultado.sancion.falta = resultado.falta;
        resultado.sancion.tipo = resultado.tipo_de_sancion;
        resultado.sancion.ppl = resultado.falta.ppl;
        const sancionCreada = await this.dataService.sancion.create(resultado.sancion);
        resultado.sancion.falta.sanciones_aplicadas.push(sancionCreada);
        const faltaActualizada = await this.dataService.falta.update(resultado.sancion.falta);

        return{
            id:sancionCreada.id
        }
    }

    async update_sancion(id:number,sancionDTO:SancionDTO,resolucion_sancion:Express.Multer.File){
        const resultado = await this.faltasSancionesFactory.crearUpdateSancion(id,sancionDTO,resolucion_sancion);
        resultado.sancion.falta = resultado.falta;
        resultado.sancion.tipo = resultado.tipo_de_sancion;
        resultado.sancion.ppl = resultado.falta.ppl;
        const sancionActualizada = await this.dataService.sancion.update(resultado.sancion);
        return{
            id:sancionActualizada.id
        }
    }

    async getSancion(id:number){
        return await this.dataService.sancion.get(id);
    }

}