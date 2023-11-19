import { GeneroModel } from "./models/genero.model";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { Module } from "@nestjs/common";
import { PersonaModel } from "./models/persona.model";
import { PostgresDataService } from "./postgres-data.service";
import { RegistroPersonaModel } from "./models/registro-persona.model";
import { TipoIdentificacionModel } from "./models/tipo_identificacion.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports:[
    TypeOrmModule.forFeature([RegistroPersonaModel, PersonaModel, GeneroModel, TipoIdentificacionModel])
  ],
  providers:[
    {
      provide: IDataService,
      useClass: PostgresDataService
    }
    
  ],
  exports:[
    IDataService
    
  ]
})
export class PostgresDataServiceModule{}