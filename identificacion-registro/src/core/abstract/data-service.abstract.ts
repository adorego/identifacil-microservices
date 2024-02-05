import { CausaJudicial } from "../entities/causa-judicial.entity";
import { Concubino } from "../entities/concubino.entity";
import { DatosFamiliares } from "../entities/datos-familiares.entity";
import { DatosPersonales } from "../entities/datos-personales.entity";
import { DocumentoOrdenPrision } from "../entities/documentos-ordenan-prision.entity";
import { EducacionFormacion } from "../entities/educacion-formacion.entity";
import { EstablecimientoPenitenciario } from "../entities/establecimiento-penitenciario.entity";
import { EstadoCivil } from "../entities/estado-civil.entity";
import { Familiar } from "../entities/familiar.entity";
import { Genero } from "../entities/genero.entity";
import { GrupoSanguineo } from "../entities/grupo-sanguineo.entity";
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
  abstract causas:IGenericRepository<CausaJudicial>
  abstract documentoOrdenPrision:IGenericRepository<DocumentoOrdenPrision>
  abstract ingresoAPrision:IGenericRepository<IngresoAPrision>
  abstract situacionJudicial:IGenericRepository<SituacionJudicial>
  abstract oficios:IGenericRepository<Oficio>
  abstract seguridad:IGenericRepository<Seguridad>
  abstract ppl:IGenericRepository<Ppl>
}