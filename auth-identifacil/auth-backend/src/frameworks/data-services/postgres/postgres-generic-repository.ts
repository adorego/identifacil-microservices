import {FindOptionsWhere, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { IGenericRepository } from "src/core/abstract/generic-repository.abstract";
import { Usuario } from "src/core/entities/usuario.entity";

@Injectable()
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
  get(id: number): Promise<T> {
    return this._repository.findOneBy({
      id:id
    } as FindOptionsWhere<unknown>)
  }
  create(item: T): Promise<T> {
    return this._repository.save(item);
  }
  update(item: T) {
    return this._repository.save(item);
  }

  findUsuario(ci:string):Promise<T>{
    return this._repository.findOneBy({
      ci:ci
    } as FindOptionsWhere<unknown>)
  }

  
}
 
