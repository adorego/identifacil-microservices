import { IGenericRepository } from "./generic-repository.abstract";
import { User } from "../entities/user.entity";

export abstract class IDataRepository<T>{
  abstract create(item:T):Promise<T>;
  
}