import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { MedidasDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/medidas-de-fuerza.dto";
import { RegistroMedicoDTO } from "src/core/dto/medidas-de-fuerza/registro-medico.dto";
import { MedidasDeFuerzaUseCase } from "src/use-cases/medidas-de-fuerza/medidas-de-fuerza-use-case.service";

@Controller('medidas_de_fuerza')
export class MedidasDeFuerzaController{
    constructor(
        private medidasDeFuerzaUseCase:MedidasDeFuerzaUseCase
    ){}

    @Post()
    async crear_medida_de_fuerza(@Body() medidaDeFuerzaDTO:MedidasDeFuerzaDTO){
        return await this.medidasDeFuerzaUseCase.crear_medida_de_fuerza(medidaDeFuerzaDTO);
    }

    @Put(':id')
    async modificar_medida_de_fuerza(@Param() param, @Body() medidaDeFuerzaDTO:MedidasDeFuerzaDTO){
        return await this.medidasDeFuerzaUseCase.actualizar_medida_de_fuerza(param.id, medidaDeFuerzaDTO);
    }

    @Get()
    async listar_medidas_de_fuerza(){
        return await this.medidasDeFuerzaUseCase.getMedidasDeFuerza();
    }

    @Post('registro_medico/:id')
    async generar_registro_medico(registroMedicoDTO:RegistroMedicoDTO){
        
    }

    @Get('registros_medicos/:id')
    async listar_registros_medicos(){

    }

}