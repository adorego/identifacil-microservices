import { FindOptionsWhere, Repository } from "typeorm";

import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { PplDTO } from "src/core/dto/ppl/ppl.dto";

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

  getPropertiesFromTable(properties:Array<string>, tableName:string):Promise<any> {
      return this._repository.query(`SELECT ${[...properties]} FROM ${tableName}`)
  }

  getAllCausasByNumeroDeIdentificacion(numeroDeIdentificacion:string):Promise<Array<T>>{
    return this._repository.createQueryBuilder("causa")
          .leftJoin("causa.persona","persona")
          .where("persona.numero_identificacion = :numero_de_identificacion ",{numero_de_identificacion:numeroDeIdentificacion})
          .getMany()


  }

  getAllPPLsByEstablecimiento(establecimiento:number):Promise<Array<T>>{
    return this._repository.createQueryBuilder("ppl")
           .leftJoinAndSelect("ppl.persona","persona")
           .leftJoinAndSelect("persona.genero","genero")
           .leftJoinAndSelect("persona.datosPersonales", "datosPersonales")
           .leftJoinAndSelect("datosPersonales.nacionalidad","nacionalidad")
           .leftJoinAndSelect("persona.salud", "salud")
           .leftJoinAndSelect("persona.salud_mental", "salud_mental")
           .leftJoinAndSelect("persona.salud_fisica", "salud_fisica")
           .leftJoinAndSelect("persona.limitacion_idiomatica", "limitacion_idiomatica")
           .leftJoinAndSelect("persona.educacionFormacion", "educacionFormacion")
           .leftJoinAndSelect("persona.seguridad", "seguridad")
           .leftJoinAndSelect("persona.datosFamiliares", "datosFamiliares")
           .leftJoinAndSelect("persona.situacionJudicial", "situacionJudicial")
           .where("ppl.establecimiento_penitenciario = :establecimiento",{establecimiento:establecimiento})
           .getMany()
  }

  getPplByCedula(ci:string):Promise<T>{
    return this._repository.createQueryBuilder("ppl")
           .leftJoinAndSelect("ppl.establecimiento_penitenciario","establecimiento")
           .leftJoinAndSelect("ppl.persona","persona")
           .leftJoinAndSelect("persona.genero","genero")
           .leftJoinAndSelect("persona.datosPersonales", "datosPersonales")
           .leftJoinAndSelect("datosPersonales.nacionalidad","nacionalidad")
           .leftJoinAndSelect("persona.salud", "salud")
           .leftJoinAndSelect("persona.salud_mental", "salud_mental")
           .leftJoinAndSelect("persona.salud_fisica", "salud_fisica")
           .leftJoinAndSelect("persona.limitacion_idiomatica", "limitacion_idiomatica")
           .leftJoinAndSelect("persona.educacionFormacion", "educacionFormacion")
           .leftJoinAndSelect("persona.seguridad", "seguridad")
           .leftJoinAndSelect("persona.datosFamiliares", "datosFamiliares")
           .leftJoinAndSelect("persona.situacionJudicial", "situacionJudicial")
           .where("persona.numero_identificacion = :ci",{ci})
           .getOne()
  }
}
  
