import { InjectRepository } from "@nestjs/typeorm";
import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { Repository } from "typeorm";
import { PersonaModel } from "./models/persona.model";
import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";


export class PostgresPersonaRepository<PersonaModel> implements IGenericRepository<PersonaModel>{
  
  constructor(
    @InjectRepository(PersonaModel)
    private personaRepository:Repository<PersonaModel>
  ){}

  getAll(): Promise<Array<PersonaModel>> {
    return this.personaRepository.find()
  }
  get(idToFind: number): Promise<PersonaModel | undefined> {
    throw new HttpException('No se encontró el registro solicitado', HttpStatus.NOT_FOUND)
  
  }
  create(item: PersonaModel): Promise<PersonaModel> {
    return this.personaRepository.save(item);
  }
  update(id: number, item: PersonaModel) {
    return this.personaRepository.save({
      id:id,
      ...item});
  }

}