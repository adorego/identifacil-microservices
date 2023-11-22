import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { IDataService } from "src/core/abstract/data-service.abstract";
import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { Persona } from "src/core/entities/persona.entity";
import { RegistroFactory } from "./registro-factory.services";
import { RegistroPersona } from "src/core/entities/registro-persona.entity";
import { RegistroPersonaDTO } from "src/core/dto/registro-persona.dto";

@Injectable()
export class RegistroUseCase{

  constructor(
    private dataService:IDataService
  ){}

  async registrar(personaARegistrar:Persona):Promise<Persona>{
    //  console.log("Objecto dataService:", this.dataService);
     try{
        //Guardar Registro
        // console.log("descriptorFacial1:", personaARegistrar.registro.descriptorFacial1);
        const registroGuardado = await this.dataService.registro.create(personaARegistrar.registro);
        personaARegistrar.registro = registroGuardado;
        const personaGuardada = await this.dataService.persona.create(personaARegistrar);
        console.log("Persona registrada:", personaGuardada);
        return personaGuardada;
        // return null
     }catch(error){
        throw new HttpException(`Error durante el registro:${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
     }

     

  }
}