import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FaltasSancionesFactory } from "./faltas-y-sanciones-factory.service";
import { FaltaDTO } from "src/core/dto/faltas_sanciones/falta.dto";
import { ResultadoCrearFaltaFactoryDTO } from "src/core/dto/faltas_sanciones/resultado-crear-falta-factory.dto";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { SancionDTO } from "src/core/dto/faltas_sanciones/sancion.dto";
import { TipoDeSancionDTO } from "src/core/dto/faltas_sanciones/tipoDeSancion.dto";
import { TipoDeSancion } from "src/core/entities/tipo-sancion.entity";


@Injectable()
export class FaltasSancionesUseCases{

    constructor(
        private dataService:IDataService,
        private faltasSancionesFactory:FaltasSancionesFactory
    ){}

    async crear_falta(faltaDTO:FaltaDTO,resolucion_falta:Express.Multer.File){
        const resultado:ResultadoCrearFaltaFactoryDTO = await this.faltasSancionesFactory.generar_falta(faltaDTO, resolucion_falta);
        resultado.nueva_falta.grado_de_falta = resultado.grado_de_falta;
        resultado.nueva_falta.tipos_de_victimas = resultado.tipos_de_victimas;
        resultado.nueva_falta.ppl = resultado.ppl;
        resultado.nueva_falta.sanciones_aplicadas = resultado.sanciones_aplicadas;

        const faltaCreada = await this.dataService.falta.create(resultado.nueva_falta);
        return{
            id:faltaCreada.id,

        }
    }

    async update_falta(id:number,faltaDTO:FaltaDTO,resolucion_falta:Express.Multer.File){
        const resultado = await this.faltasSancionesFactory.actualizar_falta(id,faltaDTO,resolucion_falta);
        resultado.falta_a_actualizar.grado_de_falta = resultado.grado_de_falta;
        resultado.falta_a_actualizar.tipos_de_victimas = resultado.tipos_de_victimas;
        resultado.falta_a_actualizar.ppl = resultado.ppl;
        resultado.falta_a_actualizar.sanciones_aplicadas = resultado.sanciones_aplicadas;

        const faltaActualizada = await this.dataService.falta.update(resultado.falta_a_actualizar);
        return{
            id:faltaActualizada.id,
            success:true

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

    async create_tipo_de_sancion(tipoDeSancionDTO:TipoDeSancionDTO){
        const nuevo_tipo_de_sancion = new TipoDeSancion();
        nuevo_tipo_de_sancion.nombre = tipoDeSancionDTO.nombre;
        nuevo_tipo_de_sancion.maximo_dias_de_sancion = tipoDeSancionDTO.maximo_dias_de_sancion;
        const tipo_de_sancion_creada = await this.dataService.tipo_sancion.create(nuevo_tipo_de_sancion);
        return{
            id:tipo_de_sancion_creada.id
        }

    }

    async actualizar_tipo_de_sancion(id:number, tipoDeSancionDTO:TipoDeSancionDTO){
        if(!id){
            throw new HttpException('El id del tipo de sancion no puede ser nulo',HttpStatus.BAD_REQUEST);
        } 
        const tipoDeSancionEncontrada = await this.dataService.tipo_sancion.get(id);
        tipoDeSancionEncontrada.nombre = tipoDeSancionDTO.nombre;
        tipoDeSancionEncontrada.maximo_dias_de_sancion = tipoDeSancionDTO.maximo_dias_de_sancion;
        const tipo_de_sancion_actualizada = await this.dataService.tipo_sancion.update(tipoDeSancionEncontrada);
        return{
            id:tipo_de_sancion_actualizada.id
        }

    }

}