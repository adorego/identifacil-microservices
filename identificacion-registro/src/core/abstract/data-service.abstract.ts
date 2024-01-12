import { DatosPersonales } from "../entities/datos-personales.entity";
import { EstadoCivil } from "../entities/estado-civil.entity";
import { Genero } from "../entities/genero.entity";
import { GrupoSanguineo } from "../entities/grupo-sanguineo.entity";
import { IGenericRepository } from "./generic-repository.abstract";
import { LimitacionIdiomatica } from "../entities/limitacion-idiomatica.entity";
import { Nacionalidad } from "../entities/nacionalidad";
import { Persona } from "../entities/persona.entity";
import { RegistroPersona } from "../entities/registro-persona.entity";
import { Salud } from "../entities/salud.entity";
import { SaludFisica } from "../entities/salud-fisica.entity";
import { SaludMental } from "../entities/salud-mental.entity";
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
}