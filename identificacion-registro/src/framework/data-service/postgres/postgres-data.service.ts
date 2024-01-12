import { IDataService } from "src/core/abstract/data-service.abstract";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { PersonaModel } from "./models/persona.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PostgreGenericRepository } from "./postgres-generic-repository";
import { GeneroModel } from "./models/genero.model";
import { TipoIdentificacionModel } from "./models/tipo_identificacion.model";
import { RegistroPersonaModel } from "./models/registro-persona.model";
import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { GrupoSanguineoModel } from "./models/grupo-sanguineo.model";
import { VacunaModel } from "./models/vacuna.model";
import { NacionalidadModel } from "./models/nacionalidad.model";
import { SaludModel } from "./models/salud.model";
import { SaludMentalModel } from "./models/salud-mental.model";
import { SaludFisicaModel } from "./models/salud-fisica.model";
import { LimitacionIdiomaticaModel } from "./models/limitacion-idiomatica.model";
import { DatosPersonalesModel } from "./models/datos-personales.model";
import { EstadoCivilModel } from "./models/estado-civil.model";

@Injectable()
export class PostgresDataService implements IDataService, OnApplicationBootstrap{
  persona: PostgreGenericRepository<PersonaModel>;
  tipo_identificacion: PostgreGenericRepository<TipoIdentificacionModel>;
  genero: PostgreGenericRepository<GeneroModel>;
  registro:PostgreGenericRepository<RegistroPersonaModel>;
  grupo_sanguineo: IGenericRepository<GrupoSanguineoModel>;
  vacuna: IGenericRepository<VacunaModel>;
  nacionalidad: IGenericRepository<NacionalidadModel>;
  salud: IGenericRepository<SaludModel>;
  saludMental:IGenericRepository<SaludMentalModel>;
  saludFisica:IGenericRepository<SaludFisicaModel>;
  limitacionesIdiomaticas:IGenericRepository<LimitacionIdiomaticaModel>;
  datosPersonales:IGenericRepository<DatosPersonalesModel>;
  estadoCivil:IGenericRepository<EstadoCivilModel>;

  constructor(
    @InjectRepository(PersonaModel)
    private persona_repository:Repository<PersonaModel>,
    @InjectRepository(GeneroModel)
    private genero_repository:Repository<GeneroModel>,
    @InjectRepository(TipoIdentificacionModel)
    private tipo_identificacion_repository:Repository<TipoIdentificacionModel>,
    @InjectRepository(RegistroPersonaModel)
    private registro_repository:Repository<RegistroPersonaModel>,
    @InjectRepository(GrupoSanguineoModel)
    private grupos_sanguineo_repository:Repository<GrupoSanguineoModel>,
    @InjectRepository(VacunaModel)
    private vacunas_repository:Repository<VacunaModel>,
    @InjectRepository(NacionalidadModel)
    private nacionalidad_repository:Repository<NacionalidadModel>,
    @InjectRepository(SaludModel)
    private salud_repository:Repository<SaludModel>,
    @InjectRepository(SaludMentalModel)
    private saludMental_repository:Repository<SaludMentalModel>,
    @InjectRepository(SaludFisicaModel)
    private saludFisica_repository:Repository<SaludFisicaModel>,
    @InjectRepository(LimitacionIdiomaticaModel)
    private limitacionesIdiomaticas_repository:Repository<LimitacionIdiomaticaModel>,
    @InjectRepository(DatosPersonalesModel)
    private datosPersonales_repository:Repository<DatosPersonalesModel>,
    @InjectRepository(EstadoCivilModel)
    private estadoCivil_repository:Repository<EstadoCivilModel>,
    ){}
  
  
 
  onApplicationBootstrap() {
    this.persona = new PostgreGenericRepository<PersonaModel>(this.persona_repository);
    this.genero = new PostgreGenericRepository<GeneroModel>(this.genero_repository);
    this.tipo_identificacion = new PostgreGenericRepository<TipoIdentificacionModel>(this.tipo_identificacion_repository);
    this.registro = new PostgreGenericRepository<RegistroPersonaModel>(this.registro_repository);
    this.grupo_sanguineo = new PostgreGenericRepository<GrupoSanguineoModel>(this.grupos_sanguineo_repository);
    this.vacuna = new PostgreGenericRepository<VacunaModel>(this.vacunas_repository);
    this.nacionalidad = new PostgreGenericRepository<NacionalidadModel>(this.nacionalidad_repository);
    this.salud = new PostgreGenericRepository<SaludModel>(this.salud_repository);
    this.saludFisica = new PostgreGenericRepository<SaludFisicaModel>(this.saludFisica_repository);
    this.saludMental = new PostgreGenericRepository<SaludMentalModel>(this.saludMental_repository);
    this.limitacionesIdiomaticas = new PostgreGenericRepository<LimitacionIdiomaticaModel>(this.limitacionesIdiomaticas_repository);
    this.datosPersonales = new PostgreGenericRepository<DatosPersonalesModel>(this.datosPersonales_repository);
    this.estadoCivil = new PostgreGenericRepository<EstadoCivilModel>(this.estadoCivil_repository);
  }
  
  
  
  

}