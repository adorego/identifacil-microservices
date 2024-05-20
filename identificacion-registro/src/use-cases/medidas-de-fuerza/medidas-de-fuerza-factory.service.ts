import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { MedidasDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/medidas-de-fuerza.dto";
import { ResultadoMedidaDeFuerzaFactoryDTO } from "src/core/dto/medidas-de-fuerza/resultado-medida-de-fuerza-factory.dto";
import { ResultadoMedidaDeFuerzaValidarDTO } from "src/core/dto/medidas-de-fuerza/resultado-medida-de-fuerza-validar-factory.dto";
import { MedidaDeSeguridadDTO } from "src/core/dto/movimientos/medida-de-seguridad.dto";
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
        nuevaMedidaDeFuerza.motivo = medidaDeFuerzaDTO.motivo;

        return{
            ppls:resultado_validar.ppls,
            tipo_de_medida_de_fuerza:resultado_validar.tipo_de_medida_de_fuerza,
            medida_de_fuerza:nuevaMedidaDeFuerza
        }
    }

    async validar_crear_medida_de_fuerza(medidaDeFuerzaDTO:MedidasDeFuerzaDTO):Promise<ResultadoMedidaDeFuerzaValidarDTO>{
        if(!medidaDeFuerzaDTO.ppls_adheridos || medidaDeFuerzaDTO.ppls_adheridos.length == 0){
            throw new HttpException("Los PPLs adheridos no pueden ser nulos",HttpStatus.BAD_REQUEST);
        }

        const ppls = await Promise.all(medidaDeFuerzaDTO.ppls_adheridos.map(
            async (id_persona_ppl)=>{
                const pplEncontrado = await this.dataService.ppl.getPPLByIdPersona(id_persona_ppl);
                if(!pplEncontrado){
                    throw new HttpException("No se encontró el PPL enviado",HttpStatus.BAD_REQUEST);
                }
                return pplEncontrado
            }
        ));

        if(!medidaDeFuerzaDTO.tipo_de_medida_de_fuerza){
            throw new HttpException("El tipo de medida de fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const tipoMedidaDeFuerza = await this.dataService.tipo_de_medida_de_fuerza.get(medidaDeFuerzaDTO.tipo_de_medida_de_fuerza);

        if(!tipoMedidaDeFuerza){
            throw new HttpException("No se encuentra en Tipo de Medida de Fuerza enviado",HttpStatus.BAD_REQUEST);
        }

        

        return{
            ppls:ppls,
            tipo_de_medida_de_fuerza:tipoMedidaDeFuerza,
            
        }
    }

    async actualizar_medida_de_fuerza(id:number, medidaDeFuerzaDTO:MedidasDeFuerzaDTO){
        if(!id){
            throw new HttpException("El id de Medida de Fuerza no puede ser nulo",HttpStatus.BAD_REQUEST);
        }

        const medida_de_fuerza = await this.dataService.medidas_de_fuerza.get(id);

        if(!medida_de_fuerza){
            throw new HttpException("No se existe la medidad de fuerza enviada",HttpStatus.BAD_REQUEST);
        }

        const ppls = await Promise.all(medidaDeFuerzaDTO.ppls_adheridos.map(
            async (id_persona_ppl)=>{
                const ppl = await this.dataService.ppl.getPPLByIdPersona(id_persona_ppl)
                if(!ppl){
                    throw new HttpException("No se encontro el PPL enviado",HttpStatus.BAD_REQUEST);
                }
                return await this.dataService.ppl.get(ppl.id);
            }
        ))

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
        medida_de_fuerza.motivo = medidaDeFuerzaDTO.motivo;

        return{
            ppls:ppls,
            tipo_de_medida_de_fuerza:tipo_de_medida_de_fuerza,
            medida_de_fuerza:medida_de_fuerza
        }

    }

}

