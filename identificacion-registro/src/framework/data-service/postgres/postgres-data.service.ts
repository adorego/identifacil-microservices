import { IDataService } from "src/core/abstract/data-service.abstract";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { PersonaModel } from "./models/persona.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PostgreGenericRepository } from "./postgres-generic-repository";
import { GeneroModel } from "./models/genero.model";
import { TipoIdentificacionModel } from "./models/tipo_identificacion.model";
import { RegistroPersonaModel } from "./models/registro-persona.model";

@Injectable()
export class PostgresDataService implements IDataService, OnApplicationBootstrap{
  persona: PostgreGenericRepository<PersonaModel>;
  tipo_identificacion: PostgreGenericRepository<TipoIdentificacionModel>;
  genero: PostgreGenericRepository<GeneroModel>;
  registro:PostgreGenericRepository<RegistroPersonaModel>

  constructor(
    @InjectRepository(PersonaModel)
    private persona_repository:Repository<PersonaModel>,
    @InjectRepository(GeneroModel)
    private genero_repository:Repository<GeneroModel>,
    @InjectRepository(TipoIdentificacionModel)
    private tipo_identificacion_repository:Repository<TipoIdentificacionModel>,
    @InjectRepository(RegistroPersonaModel)
    private registro_repository:Repository<RegistroPersonaModel>
    
    ){}
  
 
  onApplicationBootstrap() {
    this.persona = new PostgreGenericRepository<PersonaModel>(this.persona_repository);
    this.genero = new PostgreGenericRepository<GeneroModel>(this.genero_repository);
    this.tipo_identificacion = new PostgreGenericRepository<TipoIdentificacionModel>(this.tipo_identificacion_repository);
    this.registro = new PostgreGenericRepository<RegistroPersonaModel>(this.registro_repository);
  }
  
  
  
  

}