

export abstract class DataBaseService<T>{
  abstract startTransaction():Promise<T>;
  abstract commitTransaction(em:T):Promise<void>;
  abstract rollBackTransaction():Promise<void>;
}