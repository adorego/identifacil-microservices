import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { EducacionFormacion } from "src/core/entities/educacion-formacion.entity";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { RegistroEducacionDTO } from "src/core/dto/registro/registro-educacion.dto";
import { RespuestaEducacionFactoryDTO } from "src/core/dto/respuesta-educacion-factory.dto";

@Injectable()
export class RegistroEducacionFormacionFactory{
  constructor(
    private dataService:IDataService
  ){

  }

  async generarDatosEducacionFormacion(datosEducacionFormacion:RegistroEducacionDTO):Promise<RespuestaEducacionFactoryDTO>{
    if(!datosEducacionFormacion.id_persona){
      throw new HttpException('No se envió el id de la persona', HttpStatus.BAD_REQUEST);
    }

    const PersonaEncontrada = await this.dataService.persona.get(datosEducacionFormacion.id_persona);
     if(!PersonaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 

     let educacionFormacion = new EducacionFormacion();
     educacionFormacion = {
      ...datosEducacionFormacion,
      persona:PersonaEncontrada
    
    };
    console.log("EducacionFormacion creada:", educacionFormacion);
     return(
      {
        educacionFormacion:educacionFormacion
      }
     )

  }
}