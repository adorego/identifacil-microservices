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
     if(!datosFamiliaresDTO.numeroDeIdentificacion){
       throw new HttpException('No se envió el número de identificación', HttpStatus.BAD_REQUEST);
     }
     const PersonaEncontrada = await this.dataService.persona.getByNumeroIdentificacion(datosFamiliaresDTO.numeroDeIdentificacion);
     if(!PersonaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 
     console.log("Datos famiiliares:",PersonaEncontrada.datosFamiliares);
     if(PersonaEncontrada.datosFamiliares && PersonaEncontrada.datosFamiliares.id){
      throw new HttpException('Ya existe un registro de datos familiares',HttpStatus.INTERNAL_SERVER_ERROR);
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