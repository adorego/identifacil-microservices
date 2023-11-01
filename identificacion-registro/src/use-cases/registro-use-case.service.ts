import { IDataService } from "src/core/abstract/data-service.abstract";
import { Injectable } from "@nestjs/common";
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
     
    return this.dataService.persona.create(personaARegistrar);

  }
}