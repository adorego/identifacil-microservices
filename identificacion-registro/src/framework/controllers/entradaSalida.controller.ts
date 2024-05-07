import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post } from "@nestjs/common";
import { EntradaPplDTO } from "src/core/dto/entradaSalida/entrada-ppl.dto";
import { EntradaVisitanteDTO } from "src/core/dto/entradaSalida/entrada-visitante.dto";
import { SalidaVisitanteDTO } from "src/core/dto/entradaSalida/salida-visitante.dto";
import { EntradaSalidaUseCase } from "src/use-cases/entrada-salida/entrada-salida-use-case.service";

@Controller('entrada_salida')
export class EntradaSalidaController{
    private readonly logger = new Logger('EntradaSalidaController');
    constructor(
        private entradaSalidaUseCase:EntradaSalidaUseCase,
    ){}

    @Post('ppls/entrada')
    entrada_ppl(@Body() entradaPplDTO:EntradaPplDTO){
        this.logger.log("Llamada a entrada_ppl con los siguientes datos:",entradaPplDTO);
        try{
            const respuestaEntradaSalidaUseCase = this.entradaSalidaUseCase.ingreso_ppl(entradaPplDTO);
            return(respuestaEntradaSalidaUseCase);
        }catch(error){
            this.logger.error(`Error en el registro de entrada:${error}`);
            throw new HttpException(`Error en el registro de entrada:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        
    }

    @Post('visitantes/entrada')
    entrada_visitante(@Body() entradaVisitanteDTO:EntradaVisitanteDTO){
        this.logger.log("Llamada a entrada_visitante con los siguientes datos:",entradaVisitanteDTO);
        try{
            const respuestaEntradaSalidaUseCase = this.entradaSalidaUseCase.ingreso_visitante(entradaVisitanteDTO);
            return(respuestaEntradaSalidaUseCase);
        }catch(error){
            this.logger.error(`Error en el registro de entrada de vistante:${error}`);
            throw new HttpException(`Error en el registro de entrada de visitante:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        
    }

    @Post('visitantes/salida')
    salida_visitante(@Body() salidaVisitanteDTO:SalidaVisitanteDTO){
        this.logger.log("Llamada a salida_visitante con los siguientes datos:",salidaVisitanteDTO);
        try{
            const respuestaEntradaSalidaUseCase = this.entradaSalidaUseCase.salida_visitante(salidaVisitanteDTO);
            return(respuestaEntradaSalidaUseCase);
        }catch(error){
            this.logger.error(`Error en el registro de salida de visitante:${error}`);
            throw new HttpException(`Error en el registro de salida de visitante:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        
    }

    @Get('visitantes/ingresos')
    async obtener_ingresos_visitantes(){
        try{
            return this.entradaSalidaUseCase.entradas_visitantes();
        }catch(error){
            this.logger.error(`Error en la obtencion de los ingresos de Visitantes:${error}`);
            throw new HttpException(`Error en la obtencion de los ingresos de Visitantes:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('visitantes/salidas')
    async obtener_salidas_visitantes(){
        try{
            return this.entradaSalidaUseCase.salidas_visitantes();
        }catch(error){
            this.logger.error(`Error en la obtencion de las salidas de Visitantes:${error}`);
            throw new HttpException(`Error en la obtencion de los salidas de Visitantes:${error}`,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('visitantes/entrada_salida')
    async obtener_entradas_salidas(){
        return this.entradaSalidaUseCase.entradasSalidas_visitantes();
    }

    


}