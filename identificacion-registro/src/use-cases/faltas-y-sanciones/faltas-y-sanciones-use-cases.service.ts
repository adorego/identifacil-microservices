import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FaltasSancionesFactory } from "./faltas-y-sanciones-factory.service";
import { FaltaDTO } from "src/core/dto/faltas_sanciones/falta.dto";
import { ResultadoCrearFaltaFactoryDTO } from "src/core/dto/faltas_sanciones/resultado-crear-falta-factory.dto";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { SancionDTO } from "src/core/dto/faltas_sanciones/sancion.dto";
import { TipoDeSancionDTO } from "src/core/dto/faltas_sanciones/tipoDeSancion.dto";
import { TipoDeSancion } from "src/core/entities/tipo-sancion.entity";
import { Sancion } from "src/core/entities/sancion.entity";
import { TipoDeFaltaDTO } from "src/core/dto/faltas_sanciones/tipo-de-falta.dto";
import { TipoDeFalta } from "src/core/entities/tipo_de_falta.entity";


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
        resultado.nueva_falta.tipo_de_falta = resultado.tipo_de_falta;

        const faltaCreada = await this.dataService.falta.create(resultado.nueva_falta);
        return{
            id:faltaCreada.id,

        }
    }

    async update_falta(id:number,faltaDTO:FaltaDTO,resolucion_falta:Express.Multer.File){
        console.log("Falta DTO:",faltaDTO);
        const resultado = await this.faltasSancionesFactory.actualizar_falta(id,faltaDTO,resolucion_falta);
        resultado.falta_a_actualizar.grado_de_falta = resultado.grado_de_falta;
        resultado.falta_a_actualizar.tipos_de_victimas = resultado.tipos_de_victimas;
        resultado.falta_a_actualizar.ppl = resultado.ppl;
        resultado.falta_a_actualizar.sanciones_aplicadas = resultado.sanciones_aplicadas;
        resultado.falta_a_actualizar.tipo_de_falta = resultado.tipo_de_falta;

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
                if(falta?.ppl.id === pplEncontrado.id){
                    return falta
                }
            }
        ))
        
        return faltasDelPpl;
    }

    async getFaltaById(id_falta:number){
        return await this.dataService.falta.get(id_falta);
    }

    async crear_tipo_de_falta(tipoDeFaltaDTO:TipoDeFaltaDTO){
        if(!tipoDeFaltaDTO.nombre){
            throw new HttpException('El nombre del tipo de falta no puede ser nulo',HttpStatus.BAD_REQUEST);
        }
        const tipoDeFalta = new TipoDeFalta();
        tipoDeFalta.nombre = tipoDeFaltaDTO.nombre;
        tipoDeFalta.descripcion = tipoDeFaltaDTO.descripcion;
        tipoDeFalta.eliminado = tipoDeFaltaDTO?.eliminado ? tipoDeFaltaDTO.eliminado : false;
        const resultado = await this.dataService.tipo_de_falta.create(tipoDeFalta);
        return resultado;
    }

    async actualizar_tipo_de_falta(id:number,tipoDeFaltaDTO:TipoDeFaltaDTO){
        if(!tipoDeFaltaDTO.nombre){
            throw new HttpException('El nombre del tipo de falta no puede ser nulo',HttpStatus.BAD_REQUEST);
        }
        if(!id){
            throw new HttpException('El id del tipo de falta no puede ser nulo',HttpStatus.BAD_REQUEST);
        }
        const tipoDeFaltaEncontrado = await this.dataService.tipo_de_falta.get(id);
        if(!tipoDeFaltaEncontrado){
            throw new HttpException('No se encuentra el Tipo de Falta en la BD',HttpStatus.BAD_REQUEST);
        }
        tipoDeFaltaEncontrado.nombre = tipoDeFaltaDTO.nombre;
        tipoDeFaltaEncontrado.descripcion = tipoDeFaltaDTO.descripcion;
        tipoDeFaltaEncontrado.eliminado = tipoDeFaltaDTO?.eliminado ? tipoDeFaltaDTO.eliminado : false;
        const resultado = await this.dataService.tipo_de_falta.update(tipoDeFaltaEncontrado);
        return resultado
    }

    async get_tipos_de_falta(){
        return await this.dataService.tipo_de_falta.getAll();
    }

    async getTipoDeFaltaById(id:number){
        if(!id){
            throw new HttpException('El id del tipo de falta no puede ser nulo',HttpStatus.BAD_REQUEST);
        }
        const tipoDeFaltaEncontrado = await this.dataService.tipo_de_falta.get(id);
        if(!tipoDeFaltaEncontrado){
            throw new HttpException('No se encuentra el Tipo de Falta en la BD',HttpStatus.BAD_REQUEST);
        }
        return tipoDeFaltaEncontrado;

    }

    async eliminarTipoDeFalta(id:number){
        if(!id){
            throw new HttpException('El id del tipo de falta no puede ser nulo',HttpStatus.BAD_REQUEST);
        }
        const tipoDeFaltaEncontrado = await this.dataService.tipo_de_falta.get(id);
        if(!tipoDeFaltaEncontrado){
            throw new HttpException('No se encuentra el Tipo de Falta en la BD',HttpStatus.BAD_REQUEST);
        }
        tipoDeFaltaEncontrado.eliminado = true;
        const resultado = await this.dataService.tipo_de_falta.update(tipoDeFaltaEncontrado);
        return resultado

    }

    async crear_sancion(sancionDTO:SancionDTO, resolucion_sancion:Express.Multer.File){
        const resultado = await this.faltasSancionesFactory.generar_sancion(sancionDTO,resolucion_sancion);
        resultado.sancion.falta = resultado.falta;
        resultado.sancion.tipo = resultado.tipo_de_sancion;
        resultado.sancion.ppl = resultado.falta.ppl;
        const sancionCreada = await this.dataService.sancion.create(resultado.sancion);
        if(!resultado.sancion.falta.sanciones_aplicadas){
            resultado.sancion.falta.sanciones_aplicadas = new Array<Sancion>
        }
        resultado.sancion.falta.sanciones_aplicadas.push(sancionCreada);
        const faltaActualizada = await this.dataService.falta.update(resultado.sancion.falta);

        return{
            id:sancionCreada.id
        }
    }

    async update_sancion(id:number,sancionDTO:SancionDTO,resolucion_sancion:Express.Multer.File){
        const resultado = await this.faltasSancionesFactory.update_sancion(id,sancionDTO,resolucion_sancion);
        const sancionAActualizar = resultado.sancion;
        sancionAActualizar.falta = resultado.falta;
        sancionAActualizar.tipo = resultado.tipo_de_sancion;
        sancionAActualizar.ppl = resultado.falta.ppl;
        const sancionActualizada = await this.dataService.sancion.update(sancionAActualizar);
        return{
            id:sancionActualizada.id
        }
    }

    async getFaltas(){
        return await this.dataService.falta.getAll()
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

    async tipos_de_sanciones(){
        return this.dataService.tipo_sancion.getAll();
    }

    async getTipoDeSancionesById(id:number){
        return this.dataService.tipo_sancion.get(id);
    }

    async deleteSancion(id:number){
        const sancionEncontrada = await this.dataService.sancion.get(id);
        if(!sancionEncontrada){
            throw new HttpException('No se encontró la sanción enviada',HttpStatus.BAD_REQUEST);
        }
        const resultado = await this.dataService.sancion.delete(sancionEncontrada);
        if(!resultado){
            throw new HttpException('No se pudo eliminar la sanción encontrada',HttpStatus.BAD_REQUEST);
        }
        return resultado;
    }

}