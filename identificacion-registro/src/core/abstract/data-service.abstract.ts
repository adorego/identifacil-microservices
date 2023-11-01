import { IGenericRepository } from "./generic-repository.abstract";
import { Persona } from "../entities/persona.entity";

export abstract class IDataService{
  abstract persona: IGenericRepository<Persona>;
}