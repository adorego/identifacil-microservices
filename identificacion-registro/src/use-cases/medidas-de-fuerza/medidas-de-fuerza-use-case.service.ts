import { Injectable } from "@nestjs/common";
import { MedidasDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/medidas-de-fuerza.dto";
import { MedidasDeFuerzaFactory } from "./medidas-de-fuerza-factory.service";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RegistroMedicoDTO } from "src/core/dto/medidas-de-fuerza/registro-medico.dto";

@Injectable()
export class MedidasDeFuerzaUseCase{
    constructor(
        private medidasDeFuerzaFactory:MedidasDeFuerzaFactory,
        private dataService:IDataService
    ){ }

    async crear_medida_de_fuerza(medidaDeFuerzaDTO:MedidasDeFuerzaDTO){
        const resultado_generar_medida_de_fuerza = await this.medidasDeFuerzaFactory.generar_medida_de_fuerza(medidaDeFuerzaDTO);

        resultado_generar_medida_de_fuerza.medida_de_fuerza.ppl_adheridos = resultado_generar_medida_de_fuerza.ppls;
        resultado_generar_medida_de_fuerza.medida_de_fuerza.tipo_de_medida_de_fuerza = resultado_generar_medida_de_fuerza.tipo_de_medida_de_fuerza;
        const resultado_guardar_medida_de_fuerza = await this.dataService.medidas_de_fuerza.create(resultado_generar_medida_de_fuerza.medida_de_fuerza);
        return{
            id:resultado_guardar_medida_de_fuerza.id,
            success:true
        }
    }

    async actualizar_medida_de_fuerza(id:number,medidaDeFuerzaDTO:MedidasDeFuerzaDTO){
        const resultado_actualizar_medida_de_fuerza = await this.medidasDeFuerzaFactory.actualizar_medida_de_fuerza(id, medidaDeFuerzaDTO);

        resultado_actualizar_medida_de_fuerza.medida_de_fuerza.ppl_adheridos = resultado_actualizar_medida_de_fuerza.ppls;
        resultado_actualizar_medida_de_fuerza.medida_de_fuerza.tipo_de_medida_de_fuerza = resultado_actualizar_medida_de_fuerza.tipo_de_medida_de_fuerza;
        const resultado_guardar_medida_de_fuerza = await this.dataService.medidas_de_fuerza.update(resultado_actualizar_medida_de_fuerza.medida_de_fuerza);
        return{
            id:resultado_guardar_medida_de_fuerza.id,
            success:true
        }
    }

    async getMedidasDeFuerza(){
        return await this.dataService.medidas_de_fuerza.getAll();
    }

    async crear_registro_medico(registroMedico:RegistroMedicoDTO){
        
    }

}