import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { MedidasDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/medidas-de-fuerza.dto";
import { ResultadoMedidaDeFuerzaFactoryDTO } from "src/core/dto/medidas-de-fuerza/resultado-medida-de-fuerza-factory.dto";
import { ResultadoMedidaDeFuerzaValidarDTO } from "src/core/dto/medidas-de-fuerza/resultado-medida-de-fuerza-validar-factory.dto";
import { MedidaDeFuerza } from "src/core/entities/medida-de-fuerza.entity";

@Injectable()
export class MedidasDeFuerzaFactory{

    constructor(
        private dataService:IDataService
    ){}

    async generar_medida_de_fuerza(medidaDeFuerzaDTO:MedidasDeFuerzaDTO):Promise<ResultadoMedidaDeFuerzaFactoryDTO>{
        const resultado_validar = await this.validar_crear_medida_de_fuerza(medidaDeFuerzaDTO);

        const nuevaMedidaDeFuerza = new MedidaDeFuerza();
        nuevaMedidaDeFuerza.fecha_inicio = medidaDeFuerzaDTO.fecha_de_inicio;
        nuevaMedidaDeFuerza.fecha_fin = medidaDeFuerzaDTO.fecha_de_fin;
        nuevaMedidaDeFuerza.exigencias = medidaDeFuerzaDTO.exigencias;
        

        return{
            ppl:resultado_validar.ppl,
            tipo_de_medida_de_fuerza:resultado_validar.tipo_de_medida_de_fuerza,
            medida_de_fuerza:nuevaMedidaDeFuerza,
            motivo_de_medida_de_fuerza:resultado_validar.motivo_de_medida_de_fuerza
        }
    }

    async validar_crear_medida_de_fuerza(medidaDeFuerzaDTO:MedidasDeFuerzaDTO):Promise<ResultadoMedidaDeFuerzaValidarDTO>{
        if(!medidaDeFuerzaDTO.ppl){
            throw new HttpException("El PPL adherido a esta medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        if(!medidaDeFuerzaDTO.ppl){
            throw new HttpException("El PPL enviado no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const pplByIdPersona = await this.dataService.ppl.getPPLByIdPersona(medidaDeFuerzaDTO.ppl);
        if(!pplByIdPersona){
            throw new HttpException("No se encuentra el PPL enviado",HttpStatus.BAD_REQUEST);
        }
        const ppl = await this.dataService.ppl.get(pplByIdPersona.id);

        if(!medidaDeFuerzaDTO.motivo){
            throw new HttpException("El motivo de la medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const motivo = await this.dataService.motivo_medida_de_fuerza.get(medidaDeFuerzaDTO.motivo);
        if(!motivo){
            throw new HttpException("No se encuentra el motivo de medida de fuerza enviado",HttpStatus.BAD_REQUEST);
        }

        if(!medidaDeFuerzaDTO.tipo_de_medida_de_fuerza){
            throw new HttpException("El tipo de medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const tipoMedidaDeFuerza = await this.dataService.tipo_de_medida_de_fuerza.get(medidaDeFuerzaDTO.tipo_de_medida_de_fuerza);

        if(!tipoMedidaDeFuerza){
            throw new HttpException("No se encuentra en Tipo de Medida de Fuerza enviado",HttpStatus.BAD_REQUEST);
        }

        

        return{
            ppl:ppl,
            tipo_de_medida_de_fuerza:tipoMedidaDeFuerza,
            motivo_de_medida_de_fuerza:motivo
            
        }
    }

    async actualizar_medida_de_fuerza(id:number, medidaDeFuerzaDTO:MedidasDeFuerzaDTO):Promise<ResultadoMedidaDeFuerzaFactoryDTO>{
        if(!id){
            throw new HttpException("El id de Medida de Fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const medida_de_fuerza = await this.dataService.medidas_de_fuerza.get(id);

        if(!medida_de_fuerza){
            throw new HttpException("No se existe la medidad de fuerza enviada",HttpStatus.BAD_REQUEST);
        }

        if(!medidaDeFuerzaDTO.ppl){
            throw new HttpException("El PPL enviado no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const ppl = await this.dataService.ppl.getPPLByIdPersona(medidaDeFuerzaDTO.ppl);
        if(!ppl){
            throw new HttpException("No se encuentra el PPL enviado",HttpStatus.BAD_REQUEST);
        }

        if(!medidaDeFuerzaDTO.motivo){
            throw new HttpException("El motivo de la medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const motivo = await this.dataService.motivo_medida_de_fuerza.get(medidaDeFuerzaDTO.motivo);
        if(!motivo){
            throw new HttpException("No se encuentra el motivo de medida de fuerza enviado",HttpStatus.BAD_REQUEST);
        }

        if(!medidaDeFuerzaDTO.tipo_de_medida_de_fuerza){
            throw new HttpException("El id de Tipo de Medidad de Fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const tipo_de_medida_de_fuerza = await this.dataService.tipo_de_medida_de_fuerza.get(medidaDeFuerzaDTO.tipo_de_medida_de_fuerza);

        if(!tipo_de_medida_de_fuerza){
            throw new HttpException("No se existe el tipo de medidad de fuerza enviada",HttpStatus.BAD_REQUEST);
        }

        medida_de_fuerza.id = medida_de_fuerza.id;
        medida_de_fuerza.fecha_inicio = medidaDeFuerzaDTO.fecha_de_inicio;
        medida_de_fuerza.fecha_fin = medidaDeFuerzaDTO.fecha_de_fin;
        medida_de_fuerza.exigencias = medidaDeFuerzaDTO.exigencias;
        

        return{
            ppl:ppl,
            tipo_de_medida_de_fuerza:tipo_de_medida_de_fuerza,
            medida_de_fuerza:medida_de_fuerza,
            motivo_de_medida_de_fuerza:motivo,
        }

    }

}

