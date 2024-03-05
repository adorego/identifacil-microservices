import { ExpedienteJudicial } from "../entities/expediente-judicial.entity";
import { CircunscripcionJudicial } from "../entities/circunscripcion-judicial.entity";
import { Ciudad } from "../entities/ciudad.entity";
import { Concubino } from "../entities/concubino.entity";
import { Condena } from "../entities/condena.entity";
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
import { CausaJudicialModel } from "src/framework/data-service/postgres/models/causa-judicial.model";
import { HechoPunibleCausaJudicialModel } from "src/framework/data-service/postgres/models/hecho-punible-causa-judicial.model";

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
  abstract datosFamiliares:IGenericRepository<DatosFamiliares>
  abstract establecimientoPenitenciario:IGenericRepository<EstablecimientoPenitenciario>
  abstract causaJudicial:IGenericRepository<CausaJudicialModel>
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
  abstract hechoPunibleCausaJudicial:IGenericRepository<HechoPunibleCausaJudicialModel>
  
}