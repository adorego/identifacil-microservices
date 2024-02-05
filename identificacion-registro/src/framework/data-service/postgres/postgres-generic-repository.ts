import { FindOptionsWhere, Repository } from "typeorm";

import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";

export class PostgreGenericRepository<T> implements IGenericRepository<T>{
  
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
           .where("ppl.establecimiento_penitenciario = :establecimiento",{establecimiento:establecimiento})
           .getMany()
  }
}
  
