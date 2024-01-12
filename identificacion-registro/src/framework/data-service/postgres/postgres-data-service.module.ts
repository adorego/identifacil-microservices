import { BarrioModel } from "./models/barrio.model";
import { CausaJudicialModel } from "./models/causa-judicial.model";
import { CiudadModel } from "./models/ciudad.model";
import { CompaniaModel } from "./models/compania.model";
import { ConcubinoModel } from "./models/concubino.model";
import { DatosFamiliaresModel } from "./models/datos-familiares.model";
import { DatosPersonalesModel } from "./models/datos-personales.model";
import { DocumentosOrdenanprisionModel } from "./models/documentos-ordenan-prision.model";
import { EducacionFormacionModel } from "./models/educacion-formacion.model";
import { EstadoCivilModel } from "./models/estado-civil.model";
import { FamiliarModel } from "./models/familiar.model";
import { GeneroModel } from "./models/genero.model";
import { GrupoSanguineoModel } from "./models/grupo-sanguineo.model";
import { HechoPunibleModel } from "./models/hecho-punible.model";
import { HijoPersonaModel } from "./models/hijo-persona.model";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { LimitacionIdiomaticaModel } from "./models/limitacion-idiomatica.model";
import { MaternidadModel } from "./models/maternidad.model";
import { Module } from "@nestjs/common";
import { NacionalidadModel } from "./models/nacionalidad.model";
import { PaisModel } from "./models/pais.model";
import { PersonaModel } from "./models/persona.model";
import { PostgresDataService } from "./postgres-data.service";
import { RegistroPersonaModel } from "./models/registro-persona.model";
import { SaludFisicaModel } from "./models/salud-fisica.model";
import { SaludMentalModel } from "./models/salud-mental.model";
import { SaludModel } from "./models/salud.model";
import { SeguridadModel } from "./models/seguridad_model";
import { SituacionJudicialModel } from "./models/situacion-judicial.model";
import { TipoIdentificacionModel } from "./models/tipo_identificacion.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VacunaModel } from "./models/vacuna.model";

@Module({
  imports:[
    TypeOrmModule.forFeature([
      RegistroPersonaModel, 
      PersonaModel, 
      GeneroModel, 
      TipoIdentificacionModel,
      CausaJudicialModel,
      ConcubinoModel,
      DatosFamiliaresModel,
      DocumentosOrdenanprisionModel,
      EducacionFormacionModel,
      FamiliarModel,
      GrupoSanguineoModel,
      HechoPunibleModel,
      HijoPersonaModel,
      LimitacionIdiomaticaModel,
      MaternidadModel,
      SaludModel,
      SaludMentalModel,
      SaludFisicaModel,
      SeguridadModel,
      SituacionJudicialModel,
      VacunaModel,
      NacionalidadModel,
      BarrioModel,
      CiudadModel,
      CompaniaModel,
      DatosPersonalesModel,
      EstadoCivilModel,
      NacionalidadModel,
      PaisModel,
      
    
    
    ])
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