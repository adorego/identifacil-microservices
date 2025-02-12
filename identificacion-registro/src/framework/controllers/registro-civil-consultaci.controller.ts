import { Body, Controller, Post } from "@nestjs/common";
import { RegistroCivilConsultaCIDTO } from "src/core/dto/registro_civil_consultaci/registro_civil_consultaci.dto";
import { RegistroCivilConsultaCIUseCase } from "src/use-cases/registro-civil-personas/registro-civil-consulta-ci.usecase";


@Controller('consulta_ci')
export class RegistroCivilConsultaCIController{
    constructor(
        private registro_civil_consultaci_usecase:RegistroCivilConsultaCIUseCase
    ){}

    @Post('get_datos_ci')
    async get_datos_ci(@Body() datos:RegistroCivilConsultaCIDTO){
        const persona_encontrada = await this.registro_civil_consultaci_usecase.consulta_ci(datos.cedula);
        return {
            datosDeCedula:persona_encontrada,
            exito:true
        }
    }
}