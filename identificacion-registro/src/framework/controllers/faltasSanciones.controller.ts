import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FaltaDTO } from "src/core/dto/faltas_sanciones/falta.dto";
import { GradoDeFaltaDTO } from "src/core/dto/faltas_sanciones/grado-de-falta.dto";
import { SancionDTO } from "src/core/dto/faltas_sanciones/sancion.dto";
import { FaltasSancionesUseCases } from "src/use-cases/faltas-y-sanciones/faltas-y-sanciones-use-cases.service";


@Controller('faltas_sanciones')
export class FaltasSancionesController{

    constructor(
        private faltasSancionesUseCasesService:FaltasSancionesUseCases
    ){}

    @Post('falta')
    @UseInterceptors(FileInterceptor('resolucion_falta'))
    async createFalta(@UploadedFile() resolucion_falta:Express.Multer.File, @Body() faltaDTO:FaltaDTO){
        const resultado = await this.faltasSancionesUseCasesService.crear_falta(faltaDTO,resolucion_falta);
        return{
            id:resultado.id,
            success:true
        }
    }

    @Put('falta/:id')
    @UseInterceptors(FileInterceptor('resolucion_falta'))
    async updateFalta(@UploadedFile() resolucion_falta:Express.Multer.File, @Param() param ,@Body() faltaDTO:FaltaDTO){
        const resultado = await this.faltasSancionesUseCasesService.update_falta(param.id,faltaDTO,resolucion_falta);
        return{
            id:resultado.id,
            success:true
        }
    }

    @Get('ppl/:id/falta')
    async getFaltasPpl(@Param() param:any){
        const resultado = await this.faltasSancionesUseCasesService.getFaltasPpl(param.id);
        return resultado;
    }

    @Get('falta/:id')
    async getFalta(@Param() param:any){
        const resultado = await this.faltasSancionesUseCasesService.getFaltaById(param.id);
        return resultado;
    }

    @Post('sancion')
    @UseInterceptors(FileInterceptor('resolucion_sancion'))
    async createSancion(@UploadedFile() resolucion_sancion:Express.Multer.File, @Body() sancionDTO:SancionDTO){
        const resultados = await this.faltasSancionesUseCasesService.crear_sancion(sancionDTO,resolucion_sancion);
        return{
            id:resultados.id,
            success:true
        }
    }

    @Put('sancion/:id')
    @UseInterceptors(FileInterceptor('resolucion_sancion'))
    async updateSancion(@UploadedFile() resolucion_sancion:Express.Multer.File, @Param() param ,@Body() sancionDTO:SancionDTO){
        const resultados = await this.faltasSancionesUseCasesService.update_sancion(param.id,sancionDTO,resolucion_sancion);
        return{
            id:resultados.id,
            success:true
        }
    }

    @Get('falta/:id')
    async getSancion(@Param() param:any){
        return this.faltasSancionesUseCasesService.getSancion(param.id)
    }

    @Get('sancion')
    async getSanciones(){
        
    }

    

   

}