import { IDataService } from "src/core/abstract/data-service.abstract";
import { PersonaModel } from "./models/persona.model";
import { PostgresPersonaRepository } from "./postgres-persona-repository";

export class PostgresDataService implements IDataService{
  persona: PostgresPersonaRepository<PersonaModel>;

}