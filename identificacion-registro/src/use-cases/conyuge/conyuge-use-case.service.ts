import { IDataService } from "src/core/abstract/data-service.abstract";
import { ConyugeDTO } from "src/core/dto/conyuge/conyuge.dto";
import { ConyugeFactory } from "./conyuge-factory.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";

@Injectable()
export class ConyugeUseCases{
    constructor(
        private dataService:IDataService,
        private conyugeFactory:ConyugeFactory
    ){}

    async crearConyuge(conyugeDTO:ConyugeDTO){
        const datos_conyuge = await this.conyugeFactory.generar_conyuge(conyugeDTO); 
        
        datos_conyuge.concubino.tipo_de_identificacion = datos_conyuge.tipo_de_identificacion;
        datos_conyuge.concubino.datosFamiliares = datos_conyuge.datosFamiliares;
       
        const concubinoGuardado = await this.dataService.concubino.create(datos_conyuge.concubino);
       
        datos_conyuge.datosFamiliares.concubino = concubinoGuardado;
        const pplActualizado = this.dataService.datosFamiliares.update(datos_conyuge.concubino.datosFamiliares);
        return{
            success:true,
            id:concubinoGuardado.id
        }
    }

    async actualizarConyuge(conyugeDTO:ConyugeDTO){
        const datos_conyuge = await this.conyugeFactory.actualizar_conyuge(conyugeDTO); 
        
        datos_conyuge.concubino.tipo_de_identificacion = datos_conyuge.tipo_de_identificacion;
        datos_conyuge.concubino.datosFamiliares = datos_conyuge.datosFamiliares;
        const concubinoActualizado = await this.dataService.concubino.update(datos_conyuge.concubino);
        datos_conyuge.datosFamiliares.concubino = concubinoActualizado;
        const pplActualizado = this.dataService.datosFamiliares.update(datos_conyuge.datosFamiliares);
        return{
            success:true,
            id:concubinoActualizado.id
        }

    }

    async getHistorialConyuge(id_persona:number){
       
        const persona_encontrada = await this.dataService.persona.get(id_persona);
        
        if(!persona_encontrada){
            throw new HttpException("No existe la persona con ese id",HttpStatus.BAD_REQUEST);
        }
        let historial_conyuges = persona_encontrada.datosFamiliares?.concubinos_anteriores;
        if(!historial_conyuges){
            historial_conyuges = [];
        }
        return historial_conyuges;
    }

}