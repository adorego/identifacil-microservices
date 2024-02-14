import { CausaJudicialModel } from "./models/causa-judicial.model";
import { CircunscripcionJudicialModel } from "./models/circunscripcion-judicial.model";
import { CiudadModel } from "./models/ciudad.model";
import { ConcubinoModel } from "./models/concubino.model";
import { CondenaModel } from "./models/condena.model";
import { DatosFamiliaresModel } from "./models/datos-familiares.model";
import { DatosPersonalesModel } from "./models/datos-personales.model";
import { DespachoJudicialModel } from "./models/despachos-judiciales.model";
import { DocumentosOrdenanPrisionModel } from "./models/documentos-ordenan-prision.model";
import { EducacionFormacionModel } from "./models/educacion-formacion.model";
import { EstablecimientoPenitenciarioModel } from "./models/establecimiento-penitenciario.model";
import { EstadoCivilModel } from "./models/estado-civil.model";
import { FamiliarModel } from "./models/familiar.model";
import { GeneroModel } from "./models/genero.model";
import { GrupoSanguineoModel } from "./models/grupo-sanguineo.model";
import { HechoPunibleModel } from "./models/hecho-punible.model";
import { HijoPersonaModel } from "./models/hijo-persona.model";
import { IDataService } from "src/core/abstract/data-service.abstract";
import { IngresoAPrisionModel } from "./models/ingreso-a-prision.model";
import { LimitacionIdiomaticaModel } from "./models/limitacion-idiomatica.model";
import { MaternidadModel } from "./models/maternidad.model";
import { Module } from "@nestjs/common";
import { NacionalidadModel } from "./models/nacionalidad.model";
import { OficioModel } from "./models/oficio.model";
import { PaisModel } from "./models/pais.model";
import { PersonaModel } from "./models/persona.model";
import { PostgresDataService } from "./postgres-data.service";
import { PplModel } from "./models/ppl.model";
import { RegistroPersonaModel } from "./models/registro-persona.model";
import { SaludFisicaModel } from "./models/salud-fisica.model";
import { SaludMentalModel } from "./models/salud-mental.model";
import { SaludModel } from "./models/salud.model";
import { SeguridadModel } from "./models/seguridad.model";
import { SituacionJudicialModel } from "./models/situacion-judicial.model";
import { TipoIdentificacionModel } from "./models/tipo_identificacion.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VacunaModel } from "./models/vacuna.model";
import { VinculoFamiliarModel } from "./models/vinculo-familiar.model";

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
      DocumentosOrdenanPrisionModel,
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
      CiudadModel,
      DatosPersonalesModel,
      EstadoCivilModel,
      NacionalidadModel,
      PaisModel,
      EducacionFormacionModel,
      EstablecimientoPenitenciarioModel,
      HechoPunibleModel,
      SituacionJudicialModel,
      IngresoAPrisionModel,
      CondenaModel,
      CircunscripcionJudicialModel,
      OficioModel,
      PplModel,
      VinculoFamiliarModel,
      DespachoJudicialModel
      
      
    
    
    ])
  ],
  providers:[
    {
      provide: IDataService,
      useClass: PostgresDataService
    },
    
    
  ],
  exports:[
    IDataService
    
  ]
})
export class PostgresDataServiceModule{}