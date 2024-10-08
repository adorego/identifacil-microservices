import { ExpedienteJudicial } from "../entities/expediente-judicial.entity";
import { CircunscripcionJudicial } from "../entities/circunscripcion-judicial.entity";
import { Ciudad } from "../entities/ciudad.entity";
import { Concubino } from "../entities/concubino.entity";
import { DatosFamiliares } from "../entities/datos-familiares.entity";
import { DatosPersonales } from "../entities/datos-personales.entity";
import { DespachoJudicial } from "../entities/despacho-judicial.entity";
import { DocumentoOrdenPrision } from "../entities/documentos-ordenan-prision.entity";
import { EducacionFormacion } from "../entities/educacion-formacion.entity";
import { EstablecimientoPenitenciario } from "../entities/establecimiento-penitenciario.entity";
import { EstadoCivil } from "../entities/estado-civil.entity";
import { Familiar } from "../entities/familiar.entity";
import { Genero } from "../entities/genero.entity";
import { GrupoSanguineo } from "../entities/grupo-sanguineo.entity";
import { HechoPunible } from "../entities/hecho_punible.entity";
import { IGenericRepository } from "./generic-repository.abstract";
import { IngresoAPrision } from "../entities/ingreso-a-prision.entity";
import { LimitacionIdiomatica } from "../entities/limitacion-idiomatica.entity";
import { Nacionalidad } from "../entities/nacionalidad";
import { Oficio } from "../entities/oficio.entity";
import { Persona } from "../entities/persona.entity";
import { Ppl } from "../entities/ppl.entity";
import { RegistroPersona } from "../entities/registro-persona.entity";
import { Salud } from "../entities/salud.entity";
import { SaludFisica } from "../entities/salud-fisica.entity";
import { SaludMental } from "../entities/salud-mental.entity";
import { Seguridad } from "../entities/seguridad.entity";
import { SituacionJudicial } from "../entities/situacion-judicial.entity";
import { TipoIdentificacion } from "../entities/tipo-identificacion.entity";
import { Vacuna } from "../entities/vacuna.entity";
import { VinculoFamiliar } from "../entities/vinculo-familiar.entity";
import { Defensor } from "../entities/defensor";
import { HechoPunibleCausaJudicial } from "../entities/hecho-punible-causa-judicial.entity";
import { HistorialDeCompurgamientoRecalculada } from "../entities/historial-compurgamiento-recalculo.entity";
import { CausaJudicial } from "../entities/causa-judicial.entity";
import { PplEnExpediente } from "../entities/pplEnExpediente.entity";
import { TiempoDeCondena } from "../entities/tiempo_de_condena.entity";
import { Condena } from "../entities/condena.entity";
import { Pais } from "../entities/pais.entity";
import { ContactoEnEmbajada } from "../entities/contacto_embajada.entity";
import { Movimiento } from "../entities/movimiento.entity";
import { MotivoDeTraslado } from "../entities/motivo-traslado.entity";
import { MedidaDeSeguridad } from "../entities/medida-de-seguridad.entity";
import { Vehiculo } from "../entities/vehiculo.entity";
import { Funcionario } from "../entities/funcionario.entity";
import { Custodio } from "../entities/custodio.entity";
import { Chofer } from "../entities/chofer.entity";
import { RegistroFoto } from "../entities/registro_foto.entity";
import { IngresoPPL } from "../entities/ingreso-ppl.entity";
import { IngresoVisitante } from "../entities/ingreso-visitante.entity";
import { SalidaVisitante } from "../entities/salida-visitante.entity";
import { MedidaDeFuerza } from "../entities/medida-de-fuerza.entity";
import { Sancion } from "../entities/sancion.entity";
import { Falta } from "../entities/falta.entity";
import { Departamento } from "../entities/departamento.entity";
import { PuebloIndigena } from "../entities/pueblo-indigena.entity";
import { TipoDeMedidaDeFuerza } from "../entities/tipo-medida-de-fuerza.entity";
import { MotivoDeMedidaDeFuerza } from "../entities/motivo-de-medida-de-fuerza.entity";
import { RegistroMedico } from "../entities/registro-medico.entity";
import { IngresoConyuge } from "../entities/ingreso-coyuge.entity";
import { SalidaConyuge } from "../entities/salida-conyuge.entity";
import { Usuario } from "../entities/security/usuario.entity";
import { Rol } from "../entities/security/rol.entity";
import { Permiso } from "../entities/security/permiso.entity";
import { GradoDeFalta } from "../entities/grado-de-falta.entity";
import { TipoDeFalta } from "../entities/tipo_de_falta.entity";
import { TipoDeSancion } from "../entities/tipo-sancion.entity";
import { TipoDeVictima } from "../entities/tipo-victima.entity";
import { IntervencionDefensor } from "../entities/intervencion.entity";
import { EntrevistaDefensor } from "../entities/entrevista-defensor.entity";

export abstract class IDataService{
  abstract persona: IGenericRepository<Persona>;
  abstract tipo_identificacion: IGenericRepository<TipoIdentificacion>;
  abstract genero: IGenericRepository<Genero>;
  abstract registro: IGenericRepository<RegistroPersona>
  abstract grupo_sanguineo:IGenericRepository<GrupoSanguineo>
  abstract vacuna:IGenericRepository<Vacuna>
  abstract nacionalidad:IGenericRepository<Nacionalidad>
  abstract salud:IGenericRepository<Salud>
  abstract saludMental:IGenericRepository<SaludMental>
  abstract saludFisica:IGenericRepository<SaludFisica>
  abstract limitacionesIdiomaticas:IGenericRepository<LimitacionIdiomatica>
  abstract datosPersonales:IGenericRepository<DatosPersonales>
  abstract estadoCivil:IGenericRepository<EstadoCivil>
  abstract educacionFormacion:IGenericRepository<EducacionFormacion>
  abstract familiar:IGenericRepository<Familiar>
  abstract concubino:IGenericRepository<Concubino>
  abstract ingreso_conyuge:IGenericRepository<IngresoConyuge>
  abstract salida_conyuge:IGenericRepository<SalidaConyuge>
  abstract datosFamiliares:IGenericRepository<DatosFamiliares>
  abstract establecimientoPenitenciario:IGenericRepository<EstablecimientoPenitenciario>
  abstract causaJudicial:IGenericRepository<CausaJudicial>
  abstract expediente:IGenericRepository<ExpedienteJudicial>
  abstract documentoOrdenPrision:IGenericRepository<DocumentoOrdenPrision>
  abstract ingresoAPrision:IGenericRepository<IngresoAPrision>
  abstract situacionJudicial:IGenericRepository<SituacionJudicial>
  abstract oficios:IGenericRepository<Oficio>
  abstract seguridad:IGenericRepository<Seguridad>
  abstract ppl:IGenericRepository<Ppl>
  abstract vinculo_familiar:IGenericRepository<VinculoFamiliar>
  abstract despachoJudicial:IGenericRepository<DespachoJudicial>
  abstract hechoPunible:IGenericRepository<HechoPunible>
  abstract circunscripcionJudicial:IGenericRepository<CircunscripcionJudicial>
  abstract ciudad:IGenericRepository<Ciudad>
  abstract defensor:IGenericRepository<Defensor>
  abstract hechoPunibleCausaJudicial:IGenericRepository<HechoPunibleCausaJudicial>
  abstract historial_de_compurgamiento_recalculada:IGenericRepository<HistorialDeCompurgamientoRecalculada>
  abstract pplEnExpediente:IGenericRepository<PplEnExpediente>
  abstract tiempoDeCondena:IGenericRepository<TiempoDeCondena>
  abstract condena:IGenericRepository<Condena>
  abstract pais:IGenericRepository<Pais>
  abstract contactoDeEmbajada:IGenericRepository<ContactoEnEmbajada>
  abstract movimiento:IGenericRepository<Movimiento>
  abstract motivoDeTraslado:IGenericRepository<MotivoDeTraslado>
  abstract medidaDeSeguridad:IGenericRepository<MedidaDeSeguridad>
  abstract custodio:IGenericRepository<Custodio>
  abstract chofer:IGenericRepository<Chofer>
  abstract vehiculo:IGenericRepository<Vehiculo>
  abstract funcionario:IGenericRepository<Funcionario>
  abstract registro_foto:IGenericRepository<RegistroFoto>
  abstract ingreso_ppl:IGenericRepository<IngresoPPL>
  abstract ingreso_visitante:IGenericRepository<IngresoVisitante>
  abstract salida_visitante:IGenericRepository<SalidaVisitante>
  abstract departamento:IGenericRepository<Departamento>
  abstract pueblo_indigena:IGenericRepository<PuebloIndigena>
  abstract medidas_de_fuerza:IGenericRepository<MedidaDeFuerza>
  abstract tipo_de_medida_de_fuerza:IGenericRepository<TipoDeMedidaDeFuerza>
  abstract motivo_medida_de_fuerza:IGenericRepository<MotivoDeMedidaDeFuerza>
  abstract registro_medico:IGenericRepository<RegistroMedico>
  //Faltas y Sanciones
  abstract sancion:IGenericRepository<Sancion>
  abstract tipo_sancion:IGenericRepository<TipoDeSancion>
  abstract grado_de_falta:IGenericRepository<GradoDeFalta>
  abstract falta:IGenericRepository<Falta>
  abstract tipo_de_falta:IGenericRepository<TipoDeFalta>
  abstract tipo_de_victima:IGenericRepository<TipoDeVictima>
  //Security
  abstract usuario:IGenericRepository<Usuario>;
  abstract rol:IGenericRepository<Rol>;
  abstract permiso:IGenericRepository<Permiso>;
  //Defensores
  abstract intervecion_defensores:IGenericRepository<IntervencionDefensor>;
  abstract entrevista_defensor:IGenericRepository<EntrevistaDefensor>;
}