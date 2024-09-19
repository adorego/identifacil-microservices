import { Body, Controller, Get, Logger, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { DashBoardDataDTO } from "src/core/dto/defensores/dashboard-data.dto";
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
        const resultado = this.defensoresUseCases.createIntervencion(intervencionDefensorDTO, oficio_judicial_alta_intervencion);
        return{
            success:true,
            id:resultado
        }
    }

    @Get('intervenciones/:id_circunscripcion')
    async getIntervencionesPorCircunscripcion(@Param() param:any){
        const resultado = this.defensoresUseCases.getIntervenciones(param.id_circunscripcion)
    }

}