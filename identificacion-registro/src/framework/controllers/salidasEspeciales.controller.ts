import { Body, Controller, Post } from "@nestjs/common";
import { SalidaEspecialDTO } from "src/core/dto/salidasEspeciales/salidaEspecial.dto";
import { SalidasEspecialesUseCase } from "src/use-cases/salidas-especiales/salidas-especiales-use-case.service";

@Controller()
export class SalidasTransitorias{

    constructor(
        private salidasEspecialesUseCase:SalidasEspecialesUseCase
    ){}

    @Post()
    crear_salida_especial(@Body() salidaEspecialDTO:SalidaEspecialDTO){
        this.salidasEspecialesUseCase.crear_salida_especial(salidaEspecialDTO);
    }
}