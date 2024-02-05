import { IDataService } from "src/core/abstract/data-service.abstract";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { PersonaModel } from "./models/persona.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PostgreGenericRepository } from "./postgres-generic-repository";
import { GeneroModel } from "./models/genero.model";
import { TipoIdentificacionModel } from "./models/tipo_identificacion.model";
import { RegistroPersonaModel } from "./models/registro-persona.model";
import { GrupoSanguineoModel } from "./models/grupo-sanguineo.model";
import { VacunaModel } from "./models/vacuna.model";
import { NacionalidadModel } from "./models/nacionalidad.model";
import { SaludModel } from "./models/salud.model";
import { SaludMentalModel } from "./models/salud-mental.model";
import { SaludFisicaModel } from "./models/salud-fisica.model";
import { LimitacionIdiomaticaModel } from "./models/limitacion-idiomatica.model";
import { DatosPersonalesModel } from "./models/datos-personales.model";
import { EstadoCivilModel } from "./models/estado-civil.model";
import { EducacionFormacionModel } from "./models/educacion-formacion.model";
import { Familiar } from "src/core/entities/familiar.entity";
import { Concubino } from "src/core/entities/concubino.entity";
import { DatosFamiliares } from "src/core/entities/datos-familiares.entity";
import { FamiliarModel } from "./models/familiar.model";
import { ConcubinoModel } from "./models/concubino.model";
import { DatosFamiliaresModel } from "./models/datos-familiares.model";
import { EstablecimientoPenitenciarioModel } from "./models/establecimiento-penitenciario.model";
import { CausaJudicialModel } from "./models/causa-judicial.model";
import { DocumentosOrdenanPrisionModel } from "./models/documentos-ordenan-prision.model";
import { IngresoAPrisionModel } from "./models/ingreso-a-prision.model";
import { SituacionJudicialModel } from "./models/situacion-judicial.model";
import { Oficio } from "src/core/entities/oficio.entity";
import { OficioModel } from "./models/oficio.model";
import { SeguridadModel } from "./models/seguridad.model";
import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { Ppl } from "src/core/entities/ppl.entity";
import { PplModel } from "./models/ppl.model";

@Injectable()
export class PostgresDataService implements IDataService, OnApplicationBootstrap{
  persona: PostgreGenericRepository<PersonaModel>;
  tipo_identificacion: PostgreGenericRepository<TipoIdentificacionModel>;
  genero: PostgreGenericRepository<GeneroModel>;
  registro:PostgreGenericRepository<RegistroPersonaModel>;
  grupo_sanguineo: PostgreGenericRepository<GrupoSanguineoModel>;
  vacuna: PostgreGenericRepository<VacunaModel>;
  nacionalidad: PostgreGenericRepository<NacionalidadModel>;
  salud: PostgreGenericRepository<SaludModel>;
  saludMental:PostgreGenericRepository<SaludMentalModel>;
  saludFisica:PostgreGenericRepository<SaludFisicaModel>;
  limitacionesIdiomaticas:PostgreGenericRepository<LimitacionIdiomaticaModel>;
  datosPersonales:PostgreGenericRepository<DatosPersonalesModel>;
  estadoCivil:PostgreGenericRepository<EstadoCivilModel>;
  educacionFormacion:PostgreGenericRepository<EducacionFormacionModel>;
  familiar: PostgreGenericRepository<Familiar>;
  concubino: PostgreGenericRepository<Concubino>;
  datosFamiliares: PostgreGenericRepository<DatosFamiliares>;
  establecimientoPenitenciario: PostgreGenericRepository<EstablecimientoPenitenciarioModel>;
  causas: PostgreGenericRepository<CausaJudicialModel>;
  documentoOrdenPrision: PostgreGenericRepository<DocumentosOrdenanPrisionModel>;
  ingresoAPrision: PostgreGenericRepository<IngresoAPrisionModel>;
  situacionJudicial: PostgreGenericRepository<SituacionJudicialModel>;
  oficios: PostgreGenericRepository<OficioModel>;
  seguridad: PostgreGenericRepository<SeguridadModel>;
  ppl: PostgreGenericRepository<PplModel>;

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
    @InjectRepository(EducacionFormacionModel)
    private educacionFormacion_repository:Repository<EducacionFormacionModel>,
    @InjectRepository(FamiliarModel)
    private familiar_repository:Repository<FamiliarModel>,
    @InjectRepository(ConcubinoModel)
    private concubino_repository:Repository<ConcubinoModel>,
    @InjectRepository(DatosFamiliaresModel)
    private datosFamiliares_repository:Repository<DatosFamiliaresModel>,
    @InjectRepository(EstablecimientoPenitenciarioModel)
    private establecimientosPenitenciarios_repository:Repository<EstablecimientoPenitenciarioModel>,
    @InjectRepository(CausaJudicialModel)
    private causas_repository:Repository<CausaJudicialModel>,
    @InjectRepository(DocumentosOrdenanPrisionModel)
    private documentos_ordenan_prision_repository:Repository<DocumentosOrdenanPrisionModel>,
    @InjectRepository(IngresoAPrisionModel)
    private ingreso_a_prision_repository:Repository<IngresoAPrisionModel>,
    @InjectRepository(SituacionJudicialModel)
    private situacion_judicial_repository:Repository<SituacionJudicialModel>,
    @InjectRepository(OficioModel)
    private oficios_repository:Repository<OficioModel>,
    @InjectRepository(SeguridadModel)
    private seguridad_repository:Repository<SeguridadModel>,
    @InjectRepository(PplModel)
    private ppl_repository:Repository<PplModel>,
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
    this.educacionFormacion = new PostgreGenericRepository<EducacionFormacionModel>(this.educacionFormacion_repository);
    this.familiar = new PostgreGenericRepository<FamiliarModel>(this.familiar_repository);
    this.concubino = new PostgreGenericRepository<ConcubinoModel>(this.concubino_repository);
    this.datosFamiliares = new PostgreGenericRepository<DatosFamiliaresModel>(this.datosFamiliares_repository);
    this.establecimientoPenitenciario = new PostgreGenericRepository<EstablecimientoPenitenciarioModel>(this.establecimientosPenitenciarios_repository);
    this.causas = new PostgreGenericRepository<CausaJudicialModel>(this.causas_repository);
    this.documentoOrdenPrision = new PostgreGenericRepository<DocumentosOrdenanPrisionModel>(this.documentos_ordenan_prision_repository);
    this.ingresoAPrision = new PostgreGenericRepository<IngresoAPrisionModel>(this.ingreso_a_prision_repository);
    this.situacionJudicial = new PostgreGenericRepository<SituacionJudicialModel>(this.situacion_judicial_repository);
    this.oficios = new PostgreGenericRepository<OficioModel>(this.oficios_repository);
    this.seguridad = new PostgreGenericRepository<SeguridadModel>(this.seguridad_repository);
    this.ppl = new PostgreGenericRepository<PplModel>(this.ppl_repository);
  }
  
  
  
  

}