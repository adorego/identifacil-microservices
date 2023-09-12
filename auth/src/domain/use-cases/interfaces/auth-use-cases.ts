import { UserEntity } from "../../entities/user-entity";

export interface IAuthUseCases{
  registrar(usuario:UserEntity):UserEntity;
  ingresar(ci:string,password:string):UserEntity;

  
}