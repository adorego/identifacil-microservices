import { Body, Controller, Get, Logger, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import {FileInterceptor } from "@nestjs/platform-express";
import { MedidasDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/medidas-de-fuerza.dto";
import { RegistroMedicoDTO } from "src/core/dto/medidas-de-fuerza/registro-medico.dto";
import { TipoDeMedidaDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/tipo-de-medida-de-fuerza.dto";
import { MotivoDeMedidaDeFuerza } from "src/core/entities/motivo-de-medida-de-fuerza.entity";
import { MedidasDeFuerzaUseCase } from "src/use-cases/medidas-de-fuerza/medidas-de-fuerza-use-case.service";
import { MotivoDeMedidaDeFuerzaModel } from "../data-service/postgres/models/motivo-de-medida-de-fuerza.model";
import { MotivoMedidaDeFuerzaDTO } from "src/core/dto/medidas-de-fuerza/motivo-de-medida-de-fuerza.dto";

@Controller()
export class MedidasDeFuerzaController{
    private readonly logger = new Logger('MedidasDeFuerzaController');
    constructor(
        private medidasDeFuerzaUseCase:MedidasDeFuerzaUseCase
    ){}

    @Post('medida_de_fuerza')
    async crear_medida_de_fuerza(@Body() medidaDeFuerzaDTO:MedidasDeFuerzaDTO){
        return await this.medidasDeFuerzaUseCase.crear_medida_de_fuerza(medidaDeFuerzaDTO);
    }

    @Put('medida_de_fuerza/:id')
    async modificar_medida_de_fuerza(@Param() param, @Body() medidaDeFuerzaDTO:MedidasDeFuerzaDTO){
        return await this.medidasDeFuerzaUseCase.actualizar_medida_de_fuerza(param.id, medidaDeFuerzaDTO);
    }

    @Get('medida_de_fuerza')
    async listar_medidas_de_fuerza(){
        return await this.medidasDeFuerzaUseCase.getMedidasDeFuerza();
    }

    @Get('medida_de_fuerza/:id')
    async get_medida_de_fuerza(@Param() param:any){
        return await this.medidasDeFuerzaUseCase.getMedidaDeFuerza(param.id);
    }

    @Post('registro_medico/:id')
    @UseInterceptors(FileInterceptor('documento_registro_medico'))
    async generar_registro_medico(@UploadedFile() documento_registro_medico:Express.Multer.File,@Param() param:any ,@Body() registroMedicoDTO:RegistroMedicoDTO){
        console.log("Documento recibido:",documento_registro_medico);
        const resultado_creacion_registro_medico = await this.medidasDeFuerzaUseCase.crear_registro_medico(param.id, documento_registro_medico,registroMedicoDTO);
        console.log("Resultado:",resultado_creacion_registro_medico);
        return{
            id:resultado_creacion_registro_medico.id,
            sucess:true
        }
    
    }

    @Get('registro_medico/:id')
    async listar_registros_medicos(){
        return this.medidasDeFuerzaUseCase.getRegistrosMedicos()
    }

    @Get('tipo_de_medida_de_fuerza')
    async get_medidad_de_fuerza(){
        return await this.medidasDeFuerzaUseCase.getTiposMedidaDeFuerza()
    }

    @Post('tipo_de_medida_de_fuerza')
    async crear_tipo_medida_de_fuerza(@Body() tipoMedidaDeFuerzaDTO:TipoDeMedidaDeFuerzaDTO){
        const resultado = await this.medidasDeFuerzaUseCase.crear_tipo_de_medida_de_fuerza(tipoMedidaDeFuerzaDTO);
        return {
            id:resultado.id,
            success:true
        }
    }

   

    @Put('tipo_de_medida_de_fuerza/:id')
    async actualizar_tipo_medida_de_fuerza(@Param() param:any,@Body() tipoMedidaDeFuerzaDTO:TipoDeMedidaDeFuerzaDTO){
        const resultado = await this.medidasDeFuerzaUseCase.actualizar_tipo_de_medida_de_fuerza(param.id,tipoMedidaDeFuerzaDTO);
        return {
            id:resultado.id,
            success:true
        }
    }

    @Get('motivo_de_medida_de_fuerza')
    async get_motivo_de_medida_fuerza(){
        this.logger.log("Llamado a getMotivosDeFuerza");
        return await this.medidasDeFuerzaUseCase.getMotivosMedidaDeFuerza()
    }

    @Post('motivo_de_medida_de_fuerza')
    async crear_motivo_medida_de_fuerza(@Body() motivoDeMedidaDeFuerzaDTO:MotivoMedidaDeFuerzaDTO){
        const resultado = await this.medidasDeFuerzaUseCase.crear_motivo_de_medida_de_fuerza(motivoDeMedidaDeFuerzaDTO);
        return {
            id:resultado.id,
            success:true
        }
    }

    @Put('motivo_de_medida_de_fuerza/:id')
    async actualizar_motivo_medida_de_fuerza(@Param() param:any,@Body() motivoDeMedidaDeFuerzaDTO:MotivoMedidaDeFuerzaDTO){
        const resultado = await this.medidasDeFuerzaUseCase.actualizar_motivo_de_medida_de_fuerza(param.id,motivoDeMedidaDeFuerzaDTO);
        return {
            id:resultado.id,
            success:true
        }
    }

    
}