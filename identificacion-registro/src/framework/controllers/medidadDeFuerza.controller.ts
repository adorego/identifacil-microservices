import { Body, Controller, Post, Put } from "@nestjs/common";
import { MedidasDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/medidas-de-fuerza.dto";

@Controller('medidas_fuerza')
export class MedidasDeFuerzaController{

    @Post()
    agregar_medida_de_fuerza(@Body() medidaDeFuerzaDTO:MedidasDeFuerzaDTO){

    }

    @Put()
    modificar_medida_de_fuerza(@Body() medidaDeFuerzaDTO:MedidasDeFuerzaDTO){

    }

}