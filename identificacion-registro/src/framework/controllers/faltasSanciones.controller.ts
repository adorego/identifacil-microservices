import { Body, Controller, Get, Logger, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FaltaDTO } from "src/core/dto/faltas_sanciones/falta.dto";
import { GradoDeFaltaDTO } from "src/core/dto/faltas_sanciones/grado-de-falta.dto";
import { SancionDTO } from "src/core/dto/faltas_sanciones/sancion.dto";
import { TipoDeSancionDTO } from "src/core/dto/faltas_sanciones/tipoDeSancion.dto";
import { FaltasSancionesUseCases } from "src/use-cases/faltas-y-sanciones/faltas-y-sanciones-use-cases.service";


@Controller('faltas_sanciones')
export class FaltasSancionesController{
    private readonly logger = new Logger('FaltasSancionesController');
    constructor(
        private faltasSancionesUseCasesService:FaltasSancionesUseCases
    ){}

    @Post('faltas')
    @UseInterceptors(FileInterceptor('resolucion_falta'))
    async createFalta(@UploadedFile() resolucion_falta:Express.Multer.File, @Body() faltaDTO:FaltaDTO){
        this.logger.log("Llamada a createFalta con:",faltaDTO);
        //this.logger.log("Resolucion enviada:",resolucion_falta);
        
        const resultado = await this.faltasSancionesUseCasesService.crear_falta(faltaDTO,resolucion_falta);
        return{
            id:resultado.id,
             success:true
        }
        
    }

    @Put('faltas/:id')
    @UseInterceptors(FileInterceptor('resolucion_falta'))
    async updateFalta(@UploadedFile() resolucion_falta:Express.Multer.File, @Param() param:any ,@Body() faltaDTO:FaltaDTO){
        console.log("Llamada a update Falta");
        const resultado = await this.faltasSancionesUseCasesService.update_falta(param.id,faltaDTO,resolucion_falta);
        return{
            id:resultado.id,
            success:true
        }
    }

    @Get('faltas/ppl/:id')
    async getFaltasPpl(@Param() param:any){
        const resultado = await this.faltasSancionesUseCasesService.getFaltasPpl(param.id);
        return resultado;
    }

    @Get('faltas/:id')
    async getFalta(@Param() param:any){
        const resultado = await this.faltasSancionesUseCasesService.getFaltaById(param.id);
        return resultado;
    }

    @Post('sanciones')
    @UseInterceptors(FileInterceptor('resolucion_sancion'))
    async createSancion(@UploadedFile() resolucion_sancion:Express.Multer.File, @Body() sancionDTO:SancionDTO){
        const resultados = await this.faltasSancionesUseCasesService.crear_sancion(sancionDTO,resolucion_sancion);
        return{
            id:resultados.id,
            success:true
        }
    }

    @Put('sanciones/:id')
    @UseInterceptors(FileInterceptor('resolucion_sancion'))
    async updateSancion(@UploadedFile() resolucion_sancion:Express.Multer.File, @Param() param ,@Body() sancionDTO:SancionDTO){
        const resultados = await this.faltasSancionesUseCasesService.update_sancion(param.id,sancionDTO,resolucion_sancion);
        return{
            id:resultados.id,
            success:true
        }
    }

    @Get('sanciones/:id')
    async getSancion(@Param() param:any){
        return this.faltasSancionesUseCasesService.getSancion(param.id)
    }

    @Post('sanciones/tipo_de_sanciones')
    async crearTipoDeSancion(@Body() tipoDeSancionDTO:TipoDeSancionDTO){
        const resultado = await this.faltasSancionesUseCasesService.create_tipo_de_sancion(tipoDeSancionDTO);
        return{
            id:resultado.id,
            success:true
        }
    }

    @Put('sanciones/tipo_de_sanciones/:id')
    async actualizarTipoDeSancion(@Param() param:any, @Body() tipoDeSancionDTO:TipoDeSancionDTO){
        const resultado = await this.faltasSancionesUseCasesService.actualizar_tipo_de_sancion(param.id, tipoDeSancionDTO)
        return{
            id:resultado.id,
            success:true
        }
    }
    

    

   

}