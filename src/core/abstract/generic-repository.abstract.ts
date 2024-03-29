import { HechoPunibleCausaJudicial } from "../entities/hecho-punible-causa-judicial.entity";

export abstract class IGenericRepository<T>{
  abstract getAll():Promise<Array<T>>;
  
  abstract get(id:number): Promise<T>;

  abstract getByNumeroIdentificacion(numero_identificacion:string):Promise<T>;
  
  abstract create(item: T): Promise<T>;

  abstract update(item:T):Promise<T>;

  abstract delete(item:T):Promise<boolean>;

  abstract getPropertiesFromTable(properties:Array<string>, tableName:string):Promise<any>;

 
  abstract getAllPPLsByEstablecimiento(establecimiento_penitenciario:number):Promise<Array<T>>;

  abstract getPplByCedula(ci:string):Promise<T>;

  abstract getPplById(id:number):Promise<T>;

  abstract getHechoPunibleCausaByIds(id_hechoPunible:number, id_causaJudicial:number):Promise<T>;

  abstract getTiempoDeCondenaByCombination(anhos:number,meses:number):Promise<T>;

  abstract getExpedientesByPersonaId(id:number);

  abstract getPPLByIdPersona(id:number);
}