import { IDataService } from "src/core/abstract/data-service.abstract";
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { PersonaModel } from "./models/persona.model";
import { DataSource, Repository } from "typeorm";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { PostgresGenericRepository } from "./postgres-generic-repository";
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
import { DocumentosOrdenanPrisionModel } from "./models/documentos-ordenan-prision.model";
import { IngresoAPrisionModel } from "./models/ingreso-a-prision.model";
import { SituacionJudicialModel } from "./models/situacion-judicial.model";
import { OficioModel } from "./models/oficio.model";
import { SeguridadModel } from "./models/seguridad.model";
import { PplModel } from "./models/ppl.model";
import { VinculoFamiliarModel } from "./models/vinculo-familiar.model";
import { DespachoJudicialModel } from "./models/despachos-judiciales.model";
import { HechoPunibleModel } from "./models/hecho-punible.model";
import { CircunscripcionJudicialModel } from "./models/circunscripcion-judicial.model";
import { CiudadModel } from "./models/ciudad.model";
import { DefensorModel } from "./models/defensor.model";
import { CausaJudicialModel } from "./models/causa-judicial.model";
import { ExpedienteJudicial } from "src/core/entities/expediente-judicial.entity";
import { ExpedienteJudicialModel } from "./models/expediente-judicial.model";
import { HechoPunibleCausaJudicialModel } from "./models/hecho-punible-causa-judicial.model";
import { HistorialCompurgamientoRecalculadaModel } from "./models/historial-compurgamiento-recalculada.model";
import { PplEnExpedienteModel } from "./models/ppl-en-expediente.model";
import { TiempoDeCondenaModel } from "./models/tiempo_de_condena.model";
import { CondenaModel } from "./models/condena.model";
import { PaisModel } from "./models/pais.model";
import { ContactoDeEmbajadaModel } from "./models/contacto_embajada.model";
import { MovimientoModel } from "./models/movimiento.model";
import { MotivoDeTrasladoModel } from "./models/motivo-traslado.model";
import { MedidaDeSeguridadModel } from "./models/medida-de-seguridad.model";
import { VehiculoModel } from "./models/vehiculo.model";
import { CustodioModel } from "./models/custodio.model";
import { FuncionarioModel } from "./models/funcionario.model";
import { ChoferModel } from "./models/chofer.model";
import { RegistroFotoModel } from "./models/registro-foto.model";
import { IngresoPPLModel } from "./models/ingreso-ppl.model";
import { IngresoVisitanteModel } from "./models/ingreso-visitante.model";
import { SalidaVisitanteModel } from "./models/salida-visitante.model";
import { DepartamentoModel } from "./models/departamento.model";
import { PuebloIndigenaModel } from "./models/pueblo-indigena.model";
import { MedidaDeFuerzaModel } from "./models/medida-de-fuerza.model";
import { FaltaModel } from "./models/falta.model";
import { SancionModel } from "./models/sancion.model";
import { TipoDeMedidaDeFuerzaModel } from "./models/tipo-mrdida-de-fuerza.model";
import { MotivoDeMedidaDeFuerzaModel } from "./models/motivo-de-medida-de-fuerza.model";
import { RegistroMedicoModel } from "./models/registro-medico.model";


@Injectable()
export class PostgresDataService implements IDataService, OnApplicationBootstrap{
  persona: PostgresGenericRepository<PersonaModel>;
  tipo_identificacion: PostgresGenericRepository<TipoIdentificacionModel>;
  genero: PostgresGenericRepository<GeneroModel>;
  registro:PostgresGenericRepository<RegistroPersonaModel>;
  grupo_sanguineo: PostgresGenericRepository<GrupoSanguineoModel>;
  vacuna: PostgresGenericRepository<VacunaModel>;
  nacionalidad: PostgresGenericRepository<NacionalidadModel>;
  salud: PostgresGenericRepository<SaludModel>;
  saludMental:PostgresGenericRepository<SaludMentalModel>;
  saludFisica:PostgresGenericRepository<SaludFisicaModel>;
  limitacionesIdiomaticas:PostgresGenericRepository<LimitacionIdiomaticaModel>;
  datosPersonales:PostgresGenericRepository<DatosPersonalesModel>;
  estadoCivil:PostgresGenericRepository<EstadoCivilModel>;
  educacionFormacion:PostgresGenericRepository<EducacionFormacionModel>;
  familiar: PostgresGenericRepository<Familiar>;
  concubino: PostgresGenericRepository<Concubino>;
  causaJudicial: PostgresGenericRepository<CausaJudicialModel>;
  expediente: PostgresGenericRepository<ExpedienteJudicial>;
  datosFamiliares: PostgresGenericRepository<DatosFamiliares>;
  establecimientoPenitenciario: PostgresGenericRepository<EstablecimientoPenitenciarioModel>;
  defensor:PostgresGenericRepository<DefensorModel>;
  documentoOrdenPrision: PostgresGenericRepository<DocumentosOrdenanPrisionModel>;
  ingresoAPrision: PostgresGenericRepository<IngresoAPrisionModel>;
  situacionJudicial: PostgresGenericRepository<SituacionJudicialModel>;
  oficios: PostgresGenericRepository<OficioModel>;
  seguridad: PostgresGenericRepository<SeguridadModel>;
  ppl: PostgresGenericRepository<PplModel>;
  vinculo_familiar: PostgresGenericRepository<VinculoFamiliarModel>;
  despachoJudicial: PostgresGenericRepository<DespachoJudicialModel>;
  hechoPunible: PostgresGenericRepository<HechoPunibleModel>;
  circunscripcionJudicial: PostgresGenericRepository<CircunscripcionJudicialModel>;
  ciudad:PostgresGenericRepository<CiudadModel>
  hechoPunibleCausaJudicial: PostgresGenericRepository<HechoPunibleCausaJudicialModel>;
  historial_de_compurgamiento_recalculada: PostgresGenericRepository<HistorialCompurgamientoRecalculadaModel>;
  pplEnExpediente: PostgresGenericRepository<PplEnExpedienteModel>;
  tiempoDeCondena: PostgresGenericRepository<TiempoDeCondenaModel>;
  condena: PostgresGenericRepository<CondenaModel>;
  pais: PostgresGenericRepository<PaisModel>;
  contactoDeEmbajada: PostgresGenericRepository<ContactoDeEmbajadaModel>;
  //Movimientos
  movimiento:PostgresGenericRepository<MovimientoModel>
  motivoDeTraslado:PostgresGenericRepository<MotivoDeTrasladoModel>
  medidaDeSeguridad:PostgresGenericRepository<MedidaDeSeguridadModel>
  custodio:PostgresGenericRepository<CustodioModel>
  vehiculo:PostgresGenericRepository<VehiculoModel>
  funcionario: PostgresGenericRepository<FuncionarioModel>;
  chofer: PostgresGenericRepository<ChoferModel>;
  registro_foto: PostgresGenericRepository<RegistroFotoModel>;
  departamento: PostgresGenericRepository<DepartamentoModel>;
  pueblo_indigena: PostgresGenericRepository<PuebloIndigenaModel>;

  //Entrada y Salida PPLs
  ingreso_ppl:PostgresGenericRepository<IngresoPPLModel>;

  //Entrada y Salida Visitante
  ingreso_visitante:PostgresGenericRepository<IngresoVisitanteModel>;
  salida_visitante: PostgresGenericRepository<SalidaVisitanteModel>;

  //Medidas de fuerza
  medidas_de_fuerza: PostgresGenericRepository<MedidaDeFuerzaModel>;
  tipo_de_medida_de_fuerza:PostgresGenericRepository<TipoDeMedidaDeFuerzaModel>;
  motivo_medida_de_fuerza: PostgresGenericRepository<MotivoDeMedidaDeFuerzaModel>;
  registro_medico: PostgresGenericRepository<RegistroMedicoModel>;

  //Faltas y sanciones
  falta: PostgresGenericRepository<FaltaModel>;
  sancion: PostgresGenericRepository<SancionModel>;

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
    private causaJudicial_repository:Repository<CausaJudicialModel>,
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
    @InjectDataSource()
    private dataSource:DataSource,
    @InjectRepository(VinculoFamiliarModel)
    private vinculo_familiar_repository:Repository<VinculoFamiliarModel>,
    @InjectRepository(DespachoJudicialModel)
    private despacho_judicial_repository:Repository<DespachoJudicialModel>,
    @InjectRepository(HechoPunibleModel)
    private hecho_punible_reposiitory:Repository<HechoPunibleModel>,
    @InjectRepository(CircunscripcionJudicialModel)
    private circunscripcionJudicial_repository:Repository<CircunscripcionJudicialModel>,
    @InjectRepository(CiudadModel)
    private ciudad_repository:Repository<CiudadModel>,
    @InjectRepository(DefensorModel)
    private defensor_repository:Repository<DefensorModel>,
    @InjectRepository(ExpedienteJudicialModel)
    private expediente_repository:Repository<ExpedienteJudicialModel>,
    @InjectRepository(HechoPunibleCausaJudicialModel)
    private hechoPunibleCausaJudicial_repository:Repository<HechoPunibleCausaJudicialModel>,
    @InjectRepository(HistorialCompurgamientoRecalculadaModel)
    private historialCompurgamientoRecalculado_repository:Repository<HistorialCompurgamientoRecalculadaModel>,
    @InjectRepository(PplEnExpedienteModel)
    private pplEnExpediente_repository:Repository<PplEnExpedienteModel>,
    @InjectRepository(TiempoDeCondenaModel)
    private tiempo_de_condena_repository:Repository<TiempoDeCondenaModel>,
    @InjectRepository(CondenaModel)
    private condena_repository:Repository<CondenaModel>,
    @InjectRepository(PaisModel)
    private pais_repository:Repository<PaisModel>,
    @InjectRepository(ContactoDeEmbajadaModel)
    private contacto_de_embajada_repository:Repository<ContactoDeEmbajadaModel>,
    @InjectRepository(MovimientoModel)
    private movimiento_repository:Repository<MovimientoModel>,
    @InjectRepository(MotivoDeTrasladoModel)
    private motivo_de_traslado_repository:Repository<MotivoDeTrasladoModel>,
    @InjectRepository(MedidaDeSeguridadModel)
    private medidad_de_seguridad_repository:Repository<MedidaDeSeguridadModel>,
    @InjectRepository(CustodioModel)
    private custodio_repository:Repository<CustodioModel>,
    @InjectRepository(VehiculoModel)
    private vehiculo_repository:Repository<VehiculoModel>,
    @InjectRepository(FuncionarioModel)
    private funcionario_repository:Repository<FuncionarioModel>,
    @InjectRepository(ChoferModel)
    private chofer_repository:Repository<ChoferModel>,
    @InjectRepository(RegistroFotoModel)
    private registro_foto_repository:Repository<RegistroFotoModel>,
    @InjectRepository(IngresoPPLModel)
    private ingreso_ppl_repository:Repository<IngresoPPLModel>,
    @InjectRepository(IngresoVisitanteModel)
    private ingreso_visitante_repository:Repository<IngresoVisitanteModel>,
    @InjectRepository(SalidaVisitanteModel)
    private salida_visitante_repository:Repository<SalidaVisitanteModel>,
    @InjectRepository(DepartamentoModel)
    private departamento_repository:Repository<DepartamentoModel>,

    @InjectRepository(PuebloIndigenaModel)
    private pueblo_indigena_repository:Repository<PuebloIndigenaModel>,

    @InjectRepository(MedidaDeFuerzaModel)
    private medidas_de_fuerza_repository:Repository<MedidaDeFuerzaModel>,
    @InjectRepository(TipoDeMedidaDeFuerzaModel)
    private tipo_de_medida_de_fuerza_repository:Repository<TipoDeMedidaDeFuerzaModel>,
    @InjectRepository(MotivoDeMedidaDeFuerzaModel)
    private motivo_de_medida_de_fuerza_repository:Repository<MotivoDeMedidaDeFuerzaModel>,

    @InjectRepository(RegistroMedicoModel)
    private registro_medico_repository:Repository<RegistroMedicoModel>,

    @InjectRepository(FaltaModel)
    private falta_repository:Repository<FaltaModel>,

    @InjectRepository(SancionModel)
    private sancion_repository:Repository<SancionModel>
    


    ){}
  
  
  getQueryRunner(){
    return this.dataSource.createQueryRunner();
  }
 
  onApplicationBootstrap() {
    this.persona = new PostgresGenericRepository<PersonaModel>(this.persona_repository);
    this.genero = new PostgresGenericRepository<GeneroModel>(this.genero_repository);
    this.tipo_identificacion = new PostgresGenericRepository<TipoIdentificacionModel>(this.tipo_identificacion_repository);
    this.registro = new PostgresGenericRepository<RegistroPersonaModel>(this.registro_repository);
    this.grupo_sanguineo = new PostgresGenericRepository<GrupoSanguineoModel>(this.grupos_sanguineo_repository);
    this.vacuna = new PostgresGenericRepository<VacunaModel>(this.vacunas_repository);
    this.nacionalidad = new PostgresGenericRepository<NacionalidadModel>(this.nacionalidad_repository);
    this.salud = new PostgresGenericRepository<SaludModel>(this.salud_repository);
    this.saludFisica = new PostgresGenericRepository<SaludFisicaModel>(this.saludFisica_repository);
    this.saludMental = new PostgresGenericRepository<SaludMentalModel>(this.saludMental_repository);
    this.limitacionesIdiomaticas = new PostgresGenericRepository<LimitacionIdiomaticaModel>(this.limitacionesIdiomaticas_repository);
    this.datosPersonales = new PostgresGenericRepository<DatosPersonalesModel>(this.datosPersonales_repository);
    this.estadoCivil = new PostgresGenericRepository<EstadoCivilModel>(this.estadoCivil_repository);
    this.educacionFormacion = new PostgresGenericRepository<EducacionFormacionModel>(this.educacionFormacion_repository);
    this.familiar = new PostgresGenericRepository<FamiliarModel>(this.familiar_repository);
    this.concubino = new PostgresGenericRepository<ConcubinoModel>(this.concubino_repository);
    this.datosFamiliares = new PostgresGenericRepository<DatosFamiliaresModel>(this.datosFamiliares_repository);
    this.establecimientoPenitenciario = new PostgresGenericRepository<EstablecimientoPenitenciarioModel>(this.establecimientosPenitenciarios_repository);
    this.expediente = new PostgresGenericRepository<ExpedienteJudicial>(this.expediente_repository)
    this.causaJudicial = new PostgresGenericRepository<CausaJudicialModel>(this.causaJudicial_repository);
    this.documentoOrdenPrision = new PostgresGenericRepository<DocumentosOrdenanPrisionModel>(this.documentos_ordenan_prision_repository);
    this.ingresoAPrision = new PostgresGenericRepository<IngresoAPrisionModel>(this.ingreso_a_prision_repository);
    this.situacionJudicial = new PostgresGenericRepository<SituacionJudicialModel>(this.situacion_judicial_repository);
    this.oficios = new PostgresGenericRepository<OficioModel>(this.oficios_repository);
    this.seguridad = new PostgresGenericRepository<SeguridadModel>(this.seguridad_repository);
    this.ppl = new PostgresGenericRepository<PplModel>(this.ppl_repository);
    this.vinculo_familiar = new PostgresGenericRepository<VinculoFamiliarModel>(this.vinculo_familiar_repository);
    this.despachoJudicial = new PostgresGenericRepository<DespachoJudicialModel>(this.despacho_judicial_repository);
    this.hechoPunible = new PostgresGenericRepository<HechoPunibleModel>(this.hecho_punible_reposiitory);
    this.circunscripcionJudicial = new PostgresGenericRepository<CircunscripcionJudicialModel>(this.circunscripcionJudicial_repository);
    this.ciudad = new PostgresGenericRepository<CiudadModel>(this.ciudad_repository);
    this.defensor = new PostgresGenericRepository<DefensorModel>(this.defensor_repository);
    this.hechoPunibleCausaJudicial = new PostgresGenericRepository<HechoPunibleCausaJudicialModel>(this.hechoPunibleCausaJudicial_repository);
    this.historial_de_compurgamiento_recalculada = new PostgresGenericRepository<HistorialCompurgamientoRecalculadaModel>(this.historialCompurgamientoRecalculado_repository);
    this.pplEnExpediente = new PostgresGenericRepository<PplEnExpedienteModel>(this.pplEnExpediente_repository);
    this.tiempoDeCondena = new PostgresGenericRepository<TiempoDeCondenaModel>(this.tiempo_de_condena_repository);
    this.condena = new PostgresGenericRepository<CondenaModel>(this.condena_repository);
    this.pais = new PostgresGenericRepository<PaisModel>(this.pais_repository);
    this.contactoDeEmbajada = new PostgresGenericRepository<ContactoDeEmbajadaModel>(this.contacto_de_embajada_repository)
    this.movimiento = new PostgresGenericRepository<MovimientoModel>(this.movimiento_repository)
    this.motivoDeTraslado = new PostgresGenericRepository<MotivoDeTrasladoModel>(this.motivo_de_traslado_repository)
    this.medidaDeSeguridad = new PostgresGenericRepository<MedidaDeSeguridadModel>(this.medidad_de_seguridad_repository)
    this.custodio = new PostgresGenericRepository<CustodioModel>(this.custodio_repository)
    this.vehiculo = new PostgresGenericRepository<VehiculoModel>(this.vehiculo_repository)
    this.funcionario = new PostgresGenericRepository<FuncionarioModel>(this.funcionario_repository)
    this.chofer = new PostgresGenericRepository<ChoferModel>(this.chofer_repository)
    this.registro_foto = new PostgresGenericRepository<RegistroFotoModel>(this.registro_foto_repository)
    this.ingreso_ppl = new PostgresGenericRepository<IngresoPPLModel>(this.ingreso_ppl_repository)
    this.ingreso_visitante = new PostgresGenericRepository<IngresoVisitanteModel>(this.ingreso_visitante_repository)
    this.salida_visitante = new PostgresGenericRepository<SalidaVisitanteModel>(this.salida_visitante_repository)
    this.departamento = new PostgresGenericRepository<DepartamentoModel>(this.departamento_repository)
    this.pueblo_indigena = new PostgresGenericRepository<PuebloIndigenaModel>(this.pueblo_indigena_repository)
    this.medidas_de_fuerza =  new PostgresGenericRepository<MedidaDeFuerzaModel>(this.medidas_de_fuerza_repository)
    this.tipo_de_medida_de_fuerza = new PostgresGenericRepository<TipoDeMedidaDeFuerzaModel>(this.tipo_de_medida_de_fuerza_repository)
    this.motivo_medida_de_fuerza = new PostgresGenericRepository<MotivoDeMedidaDeFuerzaModel>(this.motivo_de_medida_de_fuerza_repository)
    this.registro_medico = new PostgresGenericRepository<RegistroMedicoModel>(this.registro_medico_repository)
    this.falta = new PostgresGenericRepository<FaltaModel>(this.falta_repository)
    this.sancion = new PostgresGenericRepository<SancionModel>(this.sancion_repository)
  }
  
  
  
  

}