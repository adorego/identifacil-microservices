import { Body, Controller, Post } from "@nestjs/common";
import { FaltaAPplDTO } from "src/core/dto/faltas_sanciones/falta-ppl.dto";
import { SancionAPplDTO } from "src/core/dto/faltas_sanciones/sancion-ppl.dto";

@Controller('faltas_y_sanciones')
export class FaltasYSancionesController{

    constructor(){

    }

    @Post('sanciones/ppl')
    agregar_sancion_a_ppl(@Body() sancionAPplDTO:SancionAPplDTO){
        
    }

    @Post('faltas/ppl')
    agregar_falta_a_ppl(@Body() faltaAPplDTO:FaltaAPplDTO){
        
    }
}