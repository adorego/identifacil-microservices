import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

import { DatosPersonales } from "src/core/entities/datos-personales.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { Nacionalidad } from "src/core/entities/nacionalidad";
import { RegistroDatosPersonalesDTO } from "src/core/dto/registro-datos-personales.dto";

@Injectable()
export class RegistroDatosPersonalesFactory{
  private readonly logger = new Logger('RegistroDatosPersonalesFactory');
  constructor(private dataService:IDataService){

  }

  async registrarDatosPersonales(datosPersonalesDTO:RegistroDatosPersonalesDTO) {
     //Validacion de que existe la persona
     this.logger.log("Identificacion:"+datosPersonalesDTO.numeroDeIdentificacion);
     if(!datosPersonalesDTO.numeroDeIdentificacion){
      throw new HttpException('No se envió el número de identificación', HttpStatus.BAD_REQUEST);
     }
     const PersonaEncontrada = await this.dataService.persona.getByNumeroIdentificacion(datosPersonalesDTO.numeroDeIdentificacion);
     if(!PersonaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 

     if(!datosPersonalesDTO.estadoCivil){
      throw new HttpException('Se debe enviar un estado civil', HttpStatus.BAD_REQUEST);
     }
     const EstadoCivil = await this.dataService.estadoCivil.get(datosPersonalesDTO.estadoCivil)
     if(!EstadoCivil){
      throw new HttpException('No existe este estado civil', HttpStatus.NOT_FOUND)
     }

     const Nacionalidad:Nacionalidad = await this.dataService.nacionalidad.get(datosPersonalesDTO.nacionalidad);
     if(!Nacionalidad){
      throw new HttpException('No existe la nacionalidad', HttpStatus.NOT_FOUND);
     }

     
     let datosPersonales = new DatosPersonales();
    //  datosPersonales = {
    //   id:null,
    //   ...datosPersonalesDTO,
    //   nacionalidad:Nacionalidad,
    //   estado_civil:EstadoCivil,
    //   persona:PersonaEncontrada
    // }
  
  }
}