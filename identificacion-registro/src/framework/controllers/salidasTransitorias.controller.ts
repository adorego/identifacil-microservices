import { Body, Controller, Post } from "@nestjs/common";
import { EntradaTransitoriaDTO } from "src/core/dto/salidasTransitorias/entrada-transitoria.dto";
import { SalidaTransitoriaPplDTO } from "src/core/dto/salidasTransitorias/salida-transitoria.dto";


@Controller()
export class SalidasTransitoriasPpl{

    @Post()
    salida_ppl(@Body() salidaTransitoriaDTO:SalidaTransitoriaPplDTO){
        
    }

    @Post()
    ingreso_ppl(@Body() entradaTransitoriaDTO:EntradaTransitoriaDTO){
        
    }

}