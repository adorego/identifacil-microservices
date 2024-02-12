import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { IDataService } from "src/core/abstract/data-service.abstract";
import { RegistroDatosSeguridadDTO } from "src/core/dto/registro_seguridad/registro-datos-seguridad.dto";
import { Seguridad } from "src/core/entities/seguridad.entity";

@Injectable()
export class RegistroDatosSeguridadFactory{
  constructor(
    private dataService:IDataService
  ){}

  async generar_datos_seguridad(datosSeguridad:RegistroDatosSeguridadDTO):Promise<Seguridad>{
    if(!datosSeguridad.id_persona){
      throw new HttpException('No se envió el id de la persona', HttpStatus.BAD_REQUEST);
    }
    const personaEncontrada = await this.dataService.persona.get(datosSeguridad.id_persona);
    if(!personaEncontrada){
       throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
    } 

    let datosSeguridadAGuardar = new Seguridad(); 
    datosSeguridadAGuardar = {
      ...datosSeguridad,
      persona:personaEncontrada
    }
    return datosSeguridadAGuardar;
  }

  async generar_actualizacion_datos_de_seguridad(id:number,datosDeSeguridadDTO:RegistroDatosSeguridadDTO){
    if(!id){
      throw new HttpException('No se envió el id del registro de seguridad', HttpStatus.BAD_REQUEST);
    }

    let registroDeSeguridadAActualizar = await this.dataService.seguridad.get(id);
    if(!registroDeSeguridadAActualizar){
      throw new HttpException('No se encontró el registro de seguridad enviado', HttpStatus.BAD_REQUEST);
    }
    registroDeSeguridadAActualizar = {...datosDeSeguridadDTO, 
      persona:registroDeSeguridadAActualizar.persona};

    return{
      registroDeSeguridadAActualizar:registroDeSeguridadAActualizar,
      
    }  
  }
}