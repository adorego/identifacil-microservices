import { Genero } from "../entities/genero.entity";
import { IGenericRepository } from "./generic-repository.abstract";
import { Persona } from "../entities/persona.entity";
import { RegistroPersona } from "../entities/registro-persona.entity";
import { TipoIdentificacion } from "../entities/tipo-identificacion.entity";

export abstract class IDataService{
  abstract persona: IGenericRepository<Persona>;
  abstract tipo_identificacion: IGenericRepository<TipoIdentificacion>;
  abstract genero: IGenericRepository<Genero>;
  abstract registro: IGenericRepository<RegistroPersona>
  
}