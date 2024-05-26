import { FindOptionsWhere, Repository } from "typeorm";

import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { PplDTO } from "src/core/dto/ppl/ppl.dto";
import { HechoPunibleCausaJudicial } from "src/core/entities/hecho-punible-causa-judicial.entity";
import { Pais } from "src/core/entities/pais.entity";

export class PostgresGenericRepository<T> implements IGenericRepository<T>{
  
  private _repository:Repository<T>;

  constructor(
    repository:Repository<T>,
    
    
    ){
    this._repository = repository;
  }
  
  getAll(): Promise<T[]> {
    return this._repository.find();
  }
  get(id:number):Promise<T>{
    return this._repository.findOneBy({
      id:id
    } as FindOptionsWhere<unknown>)
  }
  getByNumeroIdentificacion(numero_identificacion:string):Promise<T>{
    return this._repository.findOneBy({
      numero_identificacion:numero_identificacion
    } as FindOptionsWhere<unknown>)
  }
  create(item: T): Promise<T> {
    // console.log('Postgres Generic create item:', item);
    return this._repository.save(item);
  }
  update(item: T):Promise<T> {
    return this._repository.save(item);
  }

  async delete(item:T): Promise<boolean> {
      const result = await this._repository.remove(item);
      return true
  }
  async  getPropertiesFromTable(properties:Array<string>, tableName:string):Promise<any> {
      return this._repository.query(`SELECT ${[...properties]} FROM ${tableName}`)
  }

  async getHechoPunibleCausaByIds(id_hechoPunible:number, id_causaJudicial:number):Promise<T>{
    return this._repository.createQueryBuilder("hechopunible_causajudicial")
           .where("hechopunible_causajudicial.hecho_punible = :hecho_punible",{hecho_punible:id_hechoPunible})
           .andWhere("hechopunible_causajudicial.causa_judicial = :causa_judicial",{causa_judicial:id_causaJudicial})
           .leftJoinAndSelect("hechopunible_causajudicial.hecho_punible","hecho_punible")
           .leftJoinAndSelect("hechopunible_causajudicial.causa_judicial","causa_judicial")
           .getOne()
  }

  getAllPPLsByEstablecimiento(establecimiento:number):Promise<Array<T>>{
    return this._repository.createQueryBuilder("ppl")
           .leftJoinAndSelect("ppl.registro_de_fotos","registro_de_fotos")
           .leftJoinAndSelect("ppl.persona","persona")
           .leftJoinAndSelect("persona.genero","genero")
           .leftJoinAndSelect("persona.tipo_identificacion","tipo_documento")
           .leftJoinAndSelect("persona.datosPersonales", "datosPersonales")
           .leftJoinAndSelect("datosPersonales.nacionalidad","nacionalidad")
           .leftJoinAndSelect("datosPersonales.estadoCivil","estadoCivil")
           .leftJoinAndSelect("persona.salud", "salud")
           .leftJoinAndSelect("persona.registro","registro")
           .leftJoinAndSelect("salud.saludMental","saludMental")
           .leftJoinAndSelect("salud.saludFisica","saludFisica")
           .leftJoinAndSelect("salud.limitacionesIdiomaticas","limitacionesIdiomaticas")
           .leftJoinAndSelect("persona.educacionFormacion", "educacionFormacion")
           .leftJoinAndSelect("persona.seguridad", "seguridad")
           .leftJoinAndSelect("persona.contactoDeEmbajadaoConsulado","contactoDeEmbajada")
           .leftJoinAndSelect("persona.datosFamiliares", "datosFamiliares")
           .leftJoinAndSelect("datosFamiliares.familiares","familiares")
           .leftJoinAndSelect("familiares.vinculo","vinculo")
           .leftJoinAndSelect("familiares.establecimiento","establecimientoFamiliar")
           .leftJoinAndSelect("persona.situacionJudicial", "situacionJudicial")
           .where("ppl.establecimiento_penitenciario = :establecimiento",{establecimiento:establecimiento})
           .getMany()
  }

  getPplByCedula(ci:string):Promise<T>{
    return this._repository.createQueryBuilder("ppl")
           .leftJoinAndSelect("ppl.establecimiento_penitenciario","establecimiento")
           .leftJoinAndSelect("ppl.registro_de_fotos","registro_de_fotos")
           .leftJoinAndSelect("ppl.persona","persona")
           .leftJoinAndSelect("persona.tipo_identificacion","tipo_documento")
           .leftJoinAndSelect("persona.genero","genero")
           .leftJoinAndSelect("persona.datosPersonales", "datosPersonales")
           .leftJoinAndSelect("persona.situacionJudicial", "situacionJudicial")
           .leftJoinAndSelect("situacionJudicial.ingresos_a_prision", "ingresos_a_prision")
           .leftJoinAndSelect("ingresos_a_prision.establecimiento_penitenciario", "establecimiento_penitenciario")
           .leftJoinAndSelect("ingresos_a_prision.documentos_que_ordenan_prision", "documentos_que_ordenan_prision")
           .leftJoinAndSelect("ingresos_a_prision.expedienteJudicial","expediente_judicial")
           .leftJoinAndSelect("datosPersonales.nacionalidad","nacionalidad")
           .leftJoinAndSelect("datosPersonales.estadoCivil","estadoCivil")
           .leftJoinAndSelect("persona.salud", "salud")
           .leftJoinAndSelect("salud.vacunas_recibidas","vacunas_recibidas")
           .leftJoinAndSelect("salud.grupo_sanguineo","grupo_sanguineo")
           .leftJoinAndSelect("salud.saludMental","saludMental")
           .leftJoinAndSelect("salud.saludFisica","saludFisica")
           .leftJoinAndSelect("salud.limitacionesIdiomaticas","limitacionesIdiomaticas")
           .leftJoinAndSelect("persona.educacionFormacion", "educacionFormacion")
           .leftJoinAndSelect("persona.seguridad", "seguridad")
           .leftJoinAndSelect("persona.contactoDeEmbajadaoConsulado","contactoDeEmbajada")
           .leftJoinAndSelect("persona.datosFamiliares", "datosFamiliares")
           .leftJoinAndSelect("persona.registro","registro")
           .leftJoinAndSelect("datosFamiliares.familiares","familiares")
           .leftJoinAndSelect("familiares.vinculo","vinculo")
           .leftJoinAndSelect("familiares.establecimiento","establecimientoFamiliar")
           .leftJoinAndSelect("datosFamiliares.concubino","concubino")
           .where("persona.numero_identificacion = :ci",{ci})
           .getOne()
  }

  getPplById(id_persona:number):Promise<T>{
    return this._repository.createQueryBuilder("ppl")
           .leftJoinAndSelect("ppl.establecimiento_penitenciario","establecimiento")
           .leftJoinAndSelect("ppl.registro_de_fotos","registro_de_fotos")
           .leftJoinAndSelect("ppl.persona","persona")
           .leftJoinAndSelect("persona.genero","genero")
           .leftJoinAndSelect("persona.tipo_identificacion","tipo_documento")
           .leftJoinAndSelect("persona.datosPersonales", "datosPersonales")
           .leftJoinAndSelect("datosPersonales.nacionalidad","nacionalidad")
           .leftJoinAndSelect("datosPersonales.estadoCivil","estadoCivil")
           .leftJoinAndSelect("datosPersonales.ciudad","ciudad")
           .leftJoinAndSelect("datosPersonales.departamento","departamento")
           .leftJoinAndSelect("persona.salud", "salud")
           .leftJoinAndSelect("salud.vacunas_recibidas","vacunas_recibidas")
           .leftJoinAndSelect("salud.grupo_sanguineo","grupo_sanguineo")
           .leftJoinAndSelect("salud.saludMental","saludMental")
           .leftJoinAndSelect("salud.saludFisica","saludFisica")
           .leftJoinAndSelect("salud.limitacionesIdiomaticas","limitacionesIdiomaticas")
           .leftJoinAndSelect("persona.educacionFormacion", "educacionFormacion")
           .leftJoinAndSelect("persona.seguridad", "seguridad")
           .leftJoinAndSelect("persona.registro","registro")
           .leftJoinAndSelect("persona.contactoDeEmbajadaoConsulado","contactoDeEmbajada")
           .leftJoinAndSelect("contactoDeEmbajada.pais","pais")
           .leftJoinAndSelect("persona.datosFamiliares", "datosFamiliares")
           .leftJoinAndSelect("datosFamiliares.familiares","familiares")
           .leftJoinAndSelect("familiares.vinculo","vinculo")
           .leftJoinAndSelect("familiares.establecimiento","establecimientoFamiliar")
           .leftJoinAndSelect("datosFamiliares.concubino","concubino")
           .leftJoinAndSelect("persona.situacionJudicial", "situacionJudicial")
           .leftJoinAndSelect("situacionJudicial.ingresos_a_prision", "ingresos_a_prision")
           .leftJoinAndSelect("ingresos_a_prision.establecimiento_penitenciario", "establecimiento_penitenciario")
           .leftJoinAndSelect("ingresos_a_prision.documentos_que_ordenan_prision", "documentos_que_ordenan_prision")
           .leftJoinAndSelect("ingresos_a_prision.expedienteJudicial","expediente_judicial")
           .where("persona.id = :id_persona",{id_persona})
           .getOne()
  }

  
  getTiempoDeCondenaByCombination(anhos:number,meses:number):Promise<T>{
    return this._repository.createQueryBuilder("TiempoDeCondena")
            .where("TiempoDeCondena.anhos = :anhos",{anhos:anhos})
            .andWhere("TiempoDeCondena.meses = :meses",{meses:meses})
            .getOne()
  }

  getExpedienteByNumeroDeExpediente(numeroDeExpediente:string):Promise<T>{
    return this._repository.createQueryBuilder("expediente")
           .where("expediente.numeroDeExpediente = :numeroDeExpediente",{numeroDeExpediente:numeroDeExpediente})
           .getOne()
  }

  getExpedientesByPersonaId(id:number):Promise<Array<T>>{
    return this._repository.createQueryBuilder("ExpedienteJudicial")
            .leftJoinAndSelect("ExpedienteJudicial.pplsEnExpediente","pplsEnExpediente")
            .leftJoinAndSelect("pplsEnExpediente.ppl","ppl")
            .leftJoinAndSelect("ppl.persona","persona")
            .where("persona.id = :id_persona",{id_persona:id})
            .getMany()
  }
 
  getPPLByIdPersona(id: number):Promise<T> {
    return this._repository.createQueryBuilder("ppl")
          .leftJoinAndSelect("ppl.persona","persona")
          .leftJoinAndSelect("persona.contactoDeEmbajadaoConsulado","contactoDeEmbajadaoConsulado")
          .leftJoinAndSelect("persona.situacionJudicial", "situacionJudicial")
          .leftJoinAndSelect("situacionJudicial.ingresos_a_prision", "ingresos_a_prision")
          .leftJoinAndSelect("ingresos_a_prision.establecimiento_penitenciario", "establecimiento_penitenciario")
          .leftJoinAndSelect("ingresos_a_prision.documentos_que_ordenan_prision", "documentos_que_ordenan_prision")
          .leftJoinAndSelect("ingresos_a_prision.expedienteJudicial","expediente_judicial")
          .leftJoinAndSelect("ppl.registro_de_fotos","registro_de_fotos")
          .where("persona.id = :id",{id})
          .getOne()
  }

  getContactoDeEmbajadaByDatos(nombre:string,numero:string,pais:Pais):Promise<T>{
    return this._repository.createQueryBuilder("contactoDeEmbajada")
            .leftJoinAndSelect("contactoDeEmbajada.pais","pais")
            .where("contactoDeEmbajada.nombre = :nombre",{nombre})
            .andWhere("contactoDeEmbajada.numero = :numero",{numero})
            .andWhere("contactoDeEmbajada.pais =:pais",{pais})
            .getOne()
  }

  getFuncionariosPorEstablecimiento(id_establecimiento:number):Promise<Array<T>>{
    return this._repository.createQueryBuilder("funcionariosPorEstablecimiento")
            .leftJoinAndSelect("funcionariosPorEstablecimiento.establecimiento","establecimiento")
            .where("establecimiento.id = :id",{id:id_establecimiento})
            .getMany()
  }

  getMedidasDeFuerzaConPpl():Promise<Array<T>>{
    return this._repository.createQueryBuilder("medida_de_fuerza")
           .leftJoinAndSelect("medida_de_fuerza.ppl","ppl")
           .leftJoinAndSelect("ppl.persona","persona")
           .leftJoinAndSelect("medida_de_fuerza.tipo_de_medida_de_fuerza","tipo_de_medida_de_fuerza")
           .leftJoinAndSelect("medida_de_fuerza.motivo","motivo_de_medida_de_fuerza")
           .leftJoinAndSelect("medida_de_fuerza.registros_medicos","registros_medicos")
           .getMany()
  }

  getMedidaDeFuerzaById(id:number):Promise<T>{
    return this._repository.createQueryBuilder("medida_de_fuerza")
           .leftJoinAndSelect("medida_de_fuerza.ppl","ppl")
           .leftJoinAndSelect("ppl.persona","persona")
           .leftJoinAndSelect("medida_de_fuerza.tipo_de_medida_de_fuerza","tipo_de_medida_de_fuerza")
           .leftJoinAndSelect("medida_de_fuerza.motivo","motivo_de_medida_de_fuerza")
           .leftJoinAndSelect("medida_de_fuerza.registros_medicos","registros_medicos")
           .where("medida_de_fuerza.id = :id",{id:id})
           .getOne()
  }

  getIngresosConyugeByCedula(ci:string):Promise<Array<T>>{
    return this._repository.createQueryBuilder("ingreso_conyuge")
           .leftJoinAndSelect("ingreso_conyuge.conyuge","conyuge")
           .leftJoinAndSelect("ingreso_conyuge.ppl_a_visitar","ppl")
           .where("conyuge.numeroDeIdentificacion = :ci",{ci:ci})
           .getMany()
  }

  getPersonaByCedula(ci:string):Promise<T>{
    return this._repository.createQueryBuilder("persona")
           .where("persona.numero_identificacion = :ci",{ci:ci})
           .getOne()
  }
}
  
