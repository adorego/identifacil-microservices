import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { DashBoardDataDTO } from "src/core/dto/defensores/dashboard-data.dto";
import { EntrevistaDefensorDTO } from "src/core/dto/defensores/entrevista-defensor.dto";
import { IntervencionDefensorDTO } from "src/core/dto/defensores/intervencion-defensor.dto";
import { DefensoresUseCases } from "src/use-cases/defensores/defensores-use-cases.services";

@Controller('defensores')
export class DefensoresController{
    private readonly logger = new Logger("DefensoresController");

    constructor(
        private defensoresUseCases:DefensoresUseCases
    ){}

    @Get('dashboard_data')
    async getDashBoardData(dashBoardDataDTO:DashBoardDataDTO){
        return await this.defensoresUseCases.getDashBoardData(dashBoardDataDTO);
    }

    @Post('intervenciones')
    @UseInterceptors(FileInterceptor('oficio_judicial_alta_intervencion'))
    async createIntervencion(@UploadedFile() oficio_judicial_alta_intervencion:Express.Multer.File, @Body() intervencionDefensorDTO:IntervencionDefensorDTO){
        const resultado = await this.defensoresUseCases.createIntervencion(intervencionDefensorDTO, oficio_judicial_alta_intervencion);
        return{
            success:true,
            id:resultado
        }
    }

    @Put('intervenciones/:id')
    @UseInterceptors(FileFieldsInterceptor([
        {name:'oficio_judicial_alta_intervencion',maxCount:1},
        {name:'oficio_judicial_baja_intervencion',maxCount:1},
    ])
    )
    async updateIntervencion(
        @Param() param:any, 
        @UploadedFiles() files:{
            oficio_judicial_alta_intervencion?:Express.Multer.File[],
            oficio_judicial_baja_intervencion?:Express.Multer.File[]
        },
        @Body() intervencionDefensorDTO:IntervencionDefensorDTO){
        const resultado = await this.defensoresUseCases.updateIntervencion(param.id, intervencionDefensorDTO, files.oficio_judicial_alta_intervencion?.[0], files.oficio_judicial_baja_intervencion?.[0]);
        return{
            success:true,
            id:resultado
        }
    }

    



    @Delete('intervenciones/:id')
    @UseInterceptors(FileInterceptor('oficio_judicial_baja_intervencion'))
    async downGradeIntervencion(@Param() param:any, @UploadedFile() oficio_judicial_baja_intervencion:Express.Multer.File){
        const resultado = await this.defensoresUseCases.deleteIntervencion(param.id, oficio_judicial_baja_intervencion);
        return{
            success:true,
            id:resultado
        }
    }

    @Get('intervenciones/circunscripcion/:id_circunscripcion')
    async getIntervencionesPorCircunscripcion(@Param() param:any){
        const resultado = await this.defensoresUseCases.getIntervenciones(param.id_circunscripcion);
        return{
            success:true,
            resultado:resultado
        }
    }

    @Get('intervenciones/:id_intervencion')
    async getIntervencion(@Param() param:any){
        const resultado = await this.defensoresUseCases.getIntervencionById(param.id_intervencion);
        return{
            success:true,
            resultado:resultado
        }
    }

    @Post('intervenciones/:id_intervencion/entrevistas')
    async createEntrevista(@Param() param:any, @Body() entrevistaDTO:EntrevistaDefensorDTO){
        console.log("Post entrevista:",param,entrevistaDTO);
        const resultado = await this.defensoresUseCases.createEntrevista(param.id_intervencion,entrevistaDTO);
        return{
            success:true,
            id:resultado
        }
    }

    @Put('intervenciones/:id_intervencion/entrevistas/:id_entrevista')
    async updateEntrevista(@Param() param:any, @Body() entrevistaDTO:EntrevistaDefensorDTO){
        
        const resultado = await this.defensoresUseCases.updateEntrevista(param.id_entrevista,entrevistaDTO);
        return{
            success:true,
            id:resultado
        }
    }

    @Get('intervenciones/:id_intervencion/entrevistas')
    async getEntrevista(@Param() param:any){
        const resultado = await this.defensoresUseCases.getEntrevistas(param.id_intervencion);
        return{
            success:true,
            resultado:resultado
        }
    }

    @Get('intervenciones/:id_intervencion/entrevistas/:id_entrevista')
    async getEntrevistaById(@Param() param:any){
        const resultado = await this.defensoresUseCases.getEntrevista(param.id_intervencion,param.id_entrevista);
        return{
            success:true,
            resultado:resultado
        }
    }

}