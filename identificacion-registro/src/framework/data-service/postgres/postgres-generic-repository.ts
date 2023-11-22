import { FindOptionsWhere, Repository } from "typeorm";

import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";

export class PostgreGenericRepository<T> implements IGenericRepository<T>{
  
  private _repository:Repository<T>;

  constructor(repository:Repository<T>){
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
  update(id: number, item: T) {
    
  }

  getPropertiesFromTable(properties:Array<string>, tableName:string):Promise<any> {
      return this._repository.query(`SELECT ${[...properties]} FROM ${tableName}`)
  }
  
}