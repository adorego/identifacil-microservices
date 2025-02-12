import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IDataService } from "src/core/abstract/data-service.abstract";

@Injectable()
export class RegistroCivilConsultaCIUseCase{
    constructor(
        private dataService:IDataService
    ){}

    async consulta_ci(ci:string){
       
            console.log("Cedula a consultar:",ci);
            const respuesta_persona = await this.dataService.registro_civil_persona.getPersonaCivilByCI(ci);
            console.log("Persona encontrada:",respuesta_persona);
            if(!respuesta_persona){
                throw new HttpException('No encontrada', HttpStatus.BAD_REQUEST);
            }else{
                return respuesta_persona;
            }
    }
}