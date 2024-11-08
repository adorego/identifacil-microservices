import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
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

    @Delete('intervenciones/:id')
    @UseInterceptors(FileInterceptor('oficio_judicial_baja_intervencion'))
    async downGradeIntervencion(@Param() param:any, @UploadedFile() oficio_judicial_baja_intervencion:Express.Multer.File){
        const resultado = await this.defensoresUseCases.deleteIntervencion(param.id, oficio_judicial_baja_intervencion);
        return{
            success:true,
            id:resultado
        }
    }

    @Get('intervenciones/:id_circunscripcion')
    async getIntervencionesPorCircunscripcion(@Param() param:any){
        const resultado = await this.defensoresUseCases.getIntervenciones(param.id_circunscripcion);
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

    @Get('intervenciones/:id_intervencion/entrevistas')
    async getEntrevista(@Param() param:any){
        const resultado = await this.defensoresUseCases.getEntrevistas(param.id_intervencion);
        return{
            success:true,
            resultado:resultado
        }
    }

}