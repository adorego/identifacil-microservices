export abstract class IGenericRepository<T>{
  abstract getAll(): Promise<T[]>;

  abstract get(id: number): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(item: T):Promise<T>;

  abstract findUsuario(ci:string):Promise<T>;
}