import { Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { SalidaEspecialDTO } from "src/core/dto/salidasEspeciales/salidaEspecial.dto";

@Injectable()
export class SalidasEspecialesUseCase{
    constructor(
        private dataService:IDataService
    ){}

    async crear_salida_especial(salidaEspecialDTO:SalidaEspecialDTO){

    }
}