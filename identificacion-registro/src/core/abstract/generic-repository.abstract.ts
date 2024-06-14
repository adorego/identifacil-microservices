import { HechoPunibleCausaJudicial } from "../entities/hecho-punible-causa-judicial.entity";
import { Pais } from "../entities/pais.entity";

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

  abstract getContactoDeEmbajadaByDatos(nombre:string,numero:string,pais:Pais):Promise<T>;

  abstract getFuncionariosPorEstablecimiento(id_establecimiento:number):Promise<Array<T>>;

  abstract getExpedienteByNumeroDeExpediente(numeroDeExpediente:string):Promise<T>;

  abstract getMedidasDeFuerzaConPpl():Promise<Array<T>>;

  abstract getMedidaDeFuerzaById(id:number):Promise<T>;

  abstract getIngresosConyugeByCedula(ci:string):Promise<Array<T>>;

  abstract getPersonaByCedula(ci:string):Promise<T>;

  abstract findUsuario(ci:string):Promise<T>; 

  abstract getRolConPermisos(id:number):Promise<T>;
}