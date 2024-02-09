import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RegistroDatosFamiliaresDTO } from "src/core/dto/registro_familiar/registro-datos-familiares.dto";

@Injectable()
export class RegistroDatosFamiliaresFactory{
  private readonly logger = new Logger('RegistroDatosFamiliaresFactory');
  constructor(
    private dataService:IDataService
  ){

  }

  async generar_datos_familiares(datosFamiliaresDTO:RegistroDatosFamiliaresDTO):Promise<DatosFamiliares>{
     if(!datosFamiliaresDTO.id_persona){
       throw new HttpException('No se envió el id de la persona', HttpStatus.BAD_REQUEST);
     }
     const PersonaEncontrada = await this.dataService.persona.get(datosFamiliaresDTO.id_persona);
     if(!PersonaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 
     

     let datosFamiliares = new DatosFamiliares();
     
     datosFamiliares = {
      ...datosFamiliaresDTO,
      persona:PersonaEncontrada
    
     }
     return(
      datosFamiliares
     )
     
  }
}