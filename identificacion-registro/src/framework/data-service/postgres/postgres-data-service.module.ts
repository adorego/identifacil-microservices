import { CircunscripcionJudicialModel } from "./models/circunscripcion-judicial.model";
import { CiudadModel } from "./models/ciudad.model";
import { ConcubinoModel } from "./models/concubino.model";
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
import { DefensorModel } from "./models/defensor.model";
import { ExpedienteJudicialModel } from "./models/expediente-judicial.model";
import { HechoPunibleCausaJudicialModel } from "./models/hecho-punible-causa-judicial.model";
import { CausaJudicialModel } from "./models/causa-judicial.model";
import { HistorialCompurgamientoRecalculadaModel } from "./models/historial-compurgamiento-recalculada.model";
import { PplEnExpedienteModel } from "./models/ppl-en-expediente.model";
import { CondenaModel } from "./models/condena.model";
import { TiempoDeCondenaModel } from "./models/tiempo_de_condena.model";
import { ContactoDeEmbajadaModel } from "./models/contacto_embajada.model";
import { MovimientoModel } from "./models/movimiento.model";
import { MotivoDeTrasladoModel } from "./models/motivo-traslado.model";
import { MedidaDeSeguridadModel } from "./models/medida-de-seguridad.model";
import { CustodioModel } from "./models/custodio.model";
import { ChoferModel } from "./models/chofer.model";
import { VehiculoModel } from "./models/vehiculo.model";
import { FuncionarioModel } from "./models/funcionario.model";
import { RegistroFotoModel } from "./models/registro-foto.model";
import { IngresoPPLModel } from "./models/ingreso-ppl.model";
import { IngresoVisitanteModel } from "./models/ingreso-visitante.model";
import { SalidaVisitanteModel } from "./models/salida-visitante.model";
import { MedidaDeFuerzaModel } from "./models/medida-de-fuerza.model";
import { FaltaModel } from "./models/falta.model";
import { SancionModel } from "./models/sancion.model";
import { TipoDeFaltaModel } from "./models/tipo-de-falta.model";
import { DepartamentoModel } from "./models/departamento.model";
import { PuebloIndigenaModel } from "./models/pueblo-indigena.model";
import { TipoDeMedidaDeFuerzaModel } from "./models/tipo-medida-de-fuerza.model";
import { MotivoDeMedidaDeFuerzaModel } from "./models/motivo-de-medida-de-fuerza.model";
import { RegistroMedicoModel } from "./models/registro-medico.model";
import { IngresoConyugeModel } from "./models/ingreso-conyuge.model";
import { SalidaConyugeModel } from "./models/salida-conyuge.model";
import { UsuarioModel } from "./models/security/usuario.model";
import { RolModel } from "./models/security/rol.model";
import { PermisoModel } from "./models/security/permiso.model";
import { TipoDeSancionModel } from "./models/tipo-sancion.model";
import { GradoDeFaltaModel } from "./models/grado-de-falta.model";
import { TipoDeVictimaModel } from "./models/tipo-victima.model";
import { IntervencionDefensorModel } from "./models/intervencion-defensor.model";
import { EntrevistaDefensorModel } from "./models/entrevista-defensor.model";

@Module({
  imports:[
    TypeOrmModule.forFeature([
      RegistroPersonaModel, 
      PersonaModel, 
      GeneroModel, 
      TipoIdentificacionModel,
      ConcubinoModel,
      IngresoConyugeModel,
      SalidaConyugeModel,
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
      CircunscripcionJudicialModel,
      OficioModel,
      PplModel,
      VinculoFamiliarModel,
      DespachoJudicialModel,
      DefensorModel,
      ExpedienteJudicialModel,
      HechoPunibleCausaJudicialModel,
      CausaJudicialModel,
      HistorialCompurgamientoRecalculadaModel,
      PplEnExpedienteModel,
      CondenaModel,
      TiempoDeCondenaModel,
      ContactoDeEmbajadaModel,
      MovimientoModel,
      MotivoDeTrasladoModel,
      MedidaDeSeguridadModel,
      CustodioModel,
      ChoferModel,
      VehiculoModel,
      FuncionarioModel,
      RegistroFotoModel,
      IngresoPPLModel,
      IngresoVisitanteModel,
      SalidaVisitanteModel,
      MedidaDeFuerzaModel,
      FaltaModel,
      SancionModel,
      TipoDeFaltaModel,
      DepartamentoModel,
      PuebloIndigenaModel,
      TipoDeMedidaDeFuerzaModel,
      MotivoDeMedidaDeFuerzaModel,
      RegistroMedicoModel,
      FaltaModel,
      GradoDeFaltaModel,
      TipoDeFaltaModel,
      TipoDeVictimaModel,
      SancionModel,
      TipoDeSancionModel,
      UsuarioModel, 
      RolModel, 
      PermisoModel,
      IntervencionDefensorModel,
      EntrevistaDefensorModel
      
    
    
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