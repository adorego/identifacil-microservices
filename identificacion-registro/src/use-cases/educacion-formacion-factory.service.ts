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

  async generarDatosEducacionFormacion(datosEducacionFormacionDTO:RegistroEducacionDTO):Promise<RespuestaEducacionFactoryDTO>{
    if(!datosEducacionFormacionDTO.id_persona){
      throw new HttpException('No se envió el id de la persona', HttpStatus.BAD_REQUEST);
    }

    const personaEncontrada = await this.dataService.persona.get(datosEducacionFormacionDTO.id_persona);
     if(!personaEncontrada){
        throw new HttpException('Esta persona no está registrada', HttpStatus.NOT_FOUND);
     } 

     let registroEducacionACrear = new EducacionFormacion();
     registroEducacionACrear.nivelAcademico = datosEducacionFormacionDTO.nivelAcademico;
     registroEducacionACrear.nivelAcademico_modificado = datosEducacionFormacionDTO.nivelAcademico_modificado;
     registroEducacionACrear.institucionEducativa = datosEducacionFormacionDTO.institucionEducativa;
     registroEducacionACrear.institucionEducativa_modificado = datosEducacionFormacionDTO.institucionEducativa_modificado;
     registroEducacionACrear.tieneOficio = datosEducacionFormacionDTO.tieneOficio;
     registroEducacionACrear.tieneOficio_modificado = datosEducacionFormacionDTO.tieneOficio_modificado;
     registroEducacionACrear.nombreOficio = datosEducacionFormacionDTO.nombreOficio;
     registroEducacionACrear.nombreOficio_modificado = datosEducacionFormacionDTO.nombreOficio_modificado;
     registroEducacionACrear.ultimoTrabajo = datosEducacionFormacionDTO.ultimoTrabajo;
     registroEducacionACrear.ultimoTrabajo_modificado = datosEducacionFormacionDTO.ultimoTrabajo_modificado;
     

    
    
   
     return(
      {
        educacionFormacion:registroEducacionACrear,
        persona:personaEncontrada
      }
     )

  }

  async generarActualizacionEducacion(id:number, datosEducacionDTO:RegistroEducacionDTO){
    //Validar id
    if(!id){
      throw new HttpException('El id del registro de Educacion debe ser valido', HttpStatus.BAD_REQUEST);
    }

    //Validar que existe el registro
    let registroDeEducacion = await this.dataService.educacionFormacion.get(id); 
    if(!registroDeEducacion){
      throw new HttpException('El registro de Educacion no existe', HttpStatus.NOT_FOUND);
    }

    registroDeEducacion = {
      id:registroDeEducacion.id,
      ...datosEducacionDTO,
      persona:registroDeEducacion.persona
    
    };

    return {
      registroDeEducacion:registroDeEducacion,
      persona:registroDeEducacion.persona
    }

  }
}