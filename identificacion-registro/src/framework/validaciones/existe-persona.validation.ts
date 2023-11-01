import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { PersonaModel } from "../data-service/postgres/models/persona.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ErrorPersonaEncontrada } from "../errors/error-persona-encontrada";

@Injectable()
export class PersonaExistValidation  implements PipeTransform {
  
  constructor(
    @InjectRepository(PersonaModel)
    private personaRepository:Repository<PersonaModel>
    
  ){}
  async transform(value: any, metadata: ArgumentMetadata) {
    const personaEncontrada = await this.personaRepository.findOne({
      where:{
        numero_identificacion:value
      }
    });

    if(personaEncontrada){
      throw new ErrorPersonaEncontrada('Esta Persona ya esta registrada');
    }
  }
  
}